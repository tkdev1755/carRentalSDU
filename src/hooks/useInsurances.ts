import useSwr from "swr";
import { getInsurancePlans } from "../api/services";

const fetcher = () => getInsurancePlans();

const useInsurance = () => {
    const { data, error, isLoading } = useSwr(["insurance"], fetcher);
    return {
        insurances: data,
        isLoading,
        error: error,
    };
};

export { useInsurance };
