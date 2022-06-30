import { post } from "API/Helpers";
import LoadDataAsync from "API/SWR";
import ActionsDiv from "Components/ActionsDiv";
import CreateBilling from "Components/CreateBilling";
import Header from "Components/Headers";
import ModifyBilling from "Components/ModifyBilling";
import TableData from "Components/TableData";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeUserData } from "Store/Authentication/Login/action";
import useSWR, { useSWRConfig } from "swr";

const Home: React.FC = () => {
  const { token, email } = useSelector((state: any) => state.storeLoginReducer);
  const { mutate } = useSWRConfig();
  const dispatch = useDispatch();
  const [createOne, setCreateOne] = useState(false);
  const [updateOne, setUpdateOne] = useState(false);
  const [updateId, setUpdateId] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [search, setSearch] = useState("");

  const { data, error } = useSWR(
    [`/billing-list?page=${pageNumber}&search=${search}`, token],
    LoadDataAsync
  );

  const pages = [];
  for (let i = 1; i <= Math.ceil(data?.pagination?.total / 10); i++) {
    pages.push(i);
  }

  const deleteBilling = async (id: string) => {
    let dataMuation = {
      ...data,
      results: data.results.filter((item: any) => item.billing_id !== id),
    };
    mutate(
      [`/billing-list?page=${pageNumber}&search=${search}`, token],
      dataMuation,
      false
    );
    const response = await post(
      `/delete-billing/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.message === "Invalid token") {
      dispatch(storeUserData("", ""));
    }
    mutate([`/billing-list?page=${pageNumber}&search=${search}`, token]);
  };

  const editBilling = (id: any) => {
    setUpdateId(id);
    setUpdateOne(true);
  };

  const handleSearch = async (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearch(searchText);
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);

  return (
    <React.Fragment>
      <Header data={data} />
      <div className="container">
        <ActionsDiv setCreateOne={setCreateOne} handleSearch={handleSearch} />
        <TableData
          billings={data || []}
          error={error}
          deleteBilling={deleteBilling}
          editBilling={editBilling}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          pages={pages}
        />
      </div>

      {createOne && (
        <CreateBilling
          data={data}
          token={token}
          mutate={mutate}
          createOne={createOne}
          setCreateOne={setCreateOne}
          pageNumber={pageNumber}
          search={search}
          email={email}
        />
      )}

      {updateOne && (
        <ModifyBilling
          data={data}
          deafultData={
            data?.results?.filter(
              (item: any) => item.billing_id === updateId
            )[0]
          }
          token={token}
          mutate={mutate}
          createOne={updateOne}
          setCreateOne={setUpdateOne}
          pageNumber={pageNumber}
          search={search}
          email={email}
        />
      )}
    </React.Fragment>
  );
};

export default React.memo(Home);
