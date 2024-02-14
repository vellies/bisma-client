import { useState, useContext, useCallback } from "react";

interface setValuesType {
  [name: string]: any;
}

const useAction = () => {
  const [searchValues, setSearchValues] = useState({});
  const [paginate, setPaginate] = useState({ offset: 0, limit: 10, currentPage: 1 });

  const onPageChanged = useCallback(({ selected }: setValuesType) => {
    let currentPage = selected;
    let offset = Math.ceil(currentPage * paginate.limit);
    setPaginate(paginate => ({
      ...paginate,
      offset,
      currentPage
    }));
    // eslint-disable-next-line
  }, []);

  const onSearchValues = (searchValues = "") => {
    setSearchValues(searchValues);
  };

  return {
    onPageChanged,
    paginate,
    onSearchValues,
    searchValues,
  };
};

export default useAction;
