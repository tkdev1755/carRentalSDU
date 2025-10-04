import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {SQL, and, eq, gte, lte, or, getTableName} from 'drizzle-orm';
import { SQLiteTable } from 'drizzle-orm/sqlite-core';
import {supabase} from "@/src/database/supabase";
import postgres from "postgres";

type WhereCondition = ReturnType<typeof eq> | ReturnType<typeof gte> | ReturnType<typeof lte> | ReturnType<typeof and> | ReturnType<typeof or> | SQL | undefined;

class SupabaseQueryBuilder<T extends SQLiteTable,R = any> {
  private supabase: SupabaseClient;
  private tableName: string;
  private whereConditions: WhereCondition[] = [];
  private whereClause?: string;

  private selectFields: string[] = ['*'];

  constructor(supabase: SupabaseClient, table: T) {
    this.supabase = supabase;
    this.tableName = getTableName(table);
  }

  select<R = any>(fields?: any) {
    return this;
  }

  from(table: T) {
    return this;
  }

  /**
   * Accepts a SQL-like string, e.g.:
   * "price >= 100 AND is_available = 1"
   * or directly a Supabase filter syntax:
   * "price.gte.100,and(is_available.eq.1)"
   */
  where(sqlString: string) {
    this.whereClause = sqlString;
    return this;
  }

  async execute() : Promise<R[]> {
    let query = this.supabase.from(this.tableName).select(this.selectFields.join(',')) as any;

    if (this.whereClause) {
      query = this.applyRawWhere(query, this.whereClause);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(`Supabase error: ${error.message}`);
    }

    return data || [];
  }

  private applyRawWhere(query: any, whereClause: string): any {
    // Si la clause ressemble à la syntaxe Supabase ("col.eq.val"), on l'applique directement
    if (whereClause.includes('.eq.') || whereClause.includes('.gte.') || whereClause.includes('.lt.')) {
      if (whereClause.toLowerCase().includes('or(')) {
        return query.or(whereClause);
      }
      if (whereClause.toLowerCase().includes('and(')) {
        return query.and(whereClause);
      }
      // fallback : simple .or() avec la chaîne complète
      return query.or(whereClause);
    }

    // Sinon, parser un SQL "classique" minimal : "price >= 100 AND seats = 4"
    // ⚠️ simplifié — pas un vrai parseur SQL
    const parts = whereClause.split(/\s+AND\s+/i);
    for (const part of parts) {
      const match = part.match(/(\w+)\s*(=|>=|<=|>|<)\s*(.*)/);
      if (!match) continue;

      const [, col, op, valRaw] = match;
      const val = valRaw.replace(/^'|'$/g, '').trim();

      switch (op) {
        case '=':
          query = query.eq(col, val);
          break;
        case '>=':
          query = query.gte(col, val);
          break;
        case '<=':
          query = query.lte(col, val);
          break;
        case '>':
          query = query.gt(col, val);
          break;
        case '<':
          query = query.lt(col, val);
          break;
        default:
          console.warn(`Unknown operator "${op}" in where:`, part);
      }
    }

    return query;
  }

  private parseCondition(query: any, condition: any): any {
    // Extraire les informations de la condition Drizzle
    const sqlChunks = condition?.sql || condition?._?.sql;
    console.log(`slq chunks are ${condition}`);
    if (!sqlChunks) {
      // Cas d'une condition composée (and, or)
      if (condition?.operator === 'and') {
        // Appliquer toutes les conditions
        for (const subCondition of condition?.conditions || []) {
          query = this.parseCondition(query, subCondition);
        }
      } else if (condition?.operator === 'or') {
        // Supabase ne supporte pas directement OR dans cette approche
        // Il faudrait utiliser .or() avec une string
        console.warn('OR conditions require special handling with Supabase');
      }
      return query;
    }

    // Extraire le nom de colonne et la valeur
    const columnName = this.extractColumnName(condition);
    const value = this.extractValue(condition);
    const operator = this.extractOperator(condition);

    // Appliquer le filtre Supabase correspondant
    switch (operator) {
      case 'eq':
        return query.eq(columnName, value);
      case 'gte':
        return query.gte(columnName, value);
      case 'lte':
        return query.lte(columnName, value);
      case 'gt':
        return query.gt(columnName, value);
      case 'lt':
        return query.lt(columnName, value);
      case 'neq':
        return query.neq(columnName, value);
      default:
        return query;
    }
  }

  private extractColumnName(condition: any): string {
    // Drizzle stocke le nom de la colonne dans la structure SQL
    const column = condition?.left || condition?.column;
    return column?.name || 'id';
  }

  private extractValue(condition: any): any {
    // Drizzle stocke la valeur dans les paramètres
    const params = condition?.params || condition?._?.params || [];
    return params[0]?.value ?? params[0];
  }

  private extractOperator(condition: any): string {
    // Identifier l'opérateur à partir de la structure SQL
    const sqlString = JSON.stringify(condition);

    if (sqlString.includes('"="')) return 'eq';
    if (sqlString.includes('">="')) return 'gte';
    if (sqlString.includes('"<="')) return 'lte';
    if (sqlString.includes('">"')) return 'gt';
    if (sqlString.includes('"<"')) return 'lt';
    if (sqlString.includes('"<>"') || sqlString.includes('"!="')) return 'neq';

    return 'eq';
  }
}

class SupabaseInsertBuilder<T extends SQLiteTable> {
  private supabase: SupabaseClient;
  private tableName: string;
  private valuesToInsert: any = null;

  constructor(supabase: SupabaseClient, table: T) {
    this.supabase = supabase;
    this.tableName = getTableName(table);
  }

  values(data: any) {
    this.valuesToInsert = data;
    return this;
  }

  async execute() {
    console.log(`values to insert ${JSON.stringify(this.valuesToInsert)}`);
    const { data, error } = await this.supabase
      .from(this.tableName)
      .insert(this.valuesToInsert)
      .select();

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    return data;
  }
}

class SupabaseUpdateBuilder<T extends SQLiteTable> {
  private supabase: SupabaseClient;
  private tableName: string;
  private updateData: any = null;
  private whereClause?: string;
  constructor(supabase: SupabaseClient, table: T) {
    this.supabase = supabase;
    this.tableName = getTableName(table);;
  }

  set(data: any) {
    this.updateData = data;
    return this;
  }
  private applyRawWhere(query: any, whereClause: string): any {
    // Si la clause ressemble à la syntaxe Supabase ("col.eq.val"), on l'applique directement
    if (whereClause.includes('.eq.') || whereClause.includes('.gte.') || whereClause.includes('.lt.')) {
      if (whereClause.toLowerCase().includes('or(')) {
        return query.or(whereClause);
      }
      if (whereClause.toLowerCase().includes('and(')) {
        return query.and(whereClause);
      }
      // fallback : simple .or() avec la chaîne complète
      return query.or(whereClause);
    }

    // Sinon, parser un SQL "classique" minimal : "price >= 100 AND seats = 4"
    // ⚠️ simplifié — pas un vrai parseur SQL
    const parts = whereClause.split(/\s+AND\s+/i);
    for (const part of parts) {
      const match = part.match(/(\w+)\s*(=|>=|<=|>|<)\s*(.*)/);
      if (!match) continue;

      const [, col, op, valRaw] = match;
      const val = valRaw.replace(/^'|'$/g, '').trim();

      switch (op) {
        case '=':
          query = query.eq(col, val);
          break;
        case '>=':
          query = query.gte(col, val);
          break;
        case '<=':
          query = query.lte(col, val);
          break;
        case '>':
          query = query.gt(col, val);
          break;
        case '<':
          query = query.lt(col, val);
          break;
        default:
          console.warn(`Unknown operator "${op}" in where:`, part);
      }
    }

    return query;
  }
  /**
   * Accepts a SQL-like string, e.g.:
   * "price >= 100 AND is_available = 1"
   * or directly a Supabase filter syntax:
   * "price.gte.100,and(is_available.eq.1)"
   */
  where(sqlString: string) {
    this.whereClause = sqlString;
    return this;
  }

  async execute() {
    let query = this.supabase
      .from(this.tableName)
      .update(this.updateData);

    // Appliquer les conditions WHERE
    if (this.whereClause) {
      query = this.applyRawWhere(query, this.whereClause);
    }

    const { data, error } = await query.select();

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    return data;
  }

  private extractColumnName(condition: any): string {
    const column = condition?.left || condition?.column;
    return column?.name || 'id';
  }

  private extractValue(condition: any): any {
    const params = condition?.params || condition?._?.params || [];
    return params[0]?.value ?? params[0];
  }
}

export class SupabaseDrizzleWrapper {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = supabase;
  }

  select() {
    return {
      from: <T extends SQLiteTable>(table: T) => {
        return new SupabaseQueryBuilder(this.supabase, table);
      }
    };
  }

  insert<T extends SQLiteTable>(table: T) {
    return new SupabaseInsertBuilder(this.supabase, table);
  }

  update<T extends SQLiteTable>(table: T) {
    return new SupabaseUpdateBuilder(this.supabase, table);
  }
}
