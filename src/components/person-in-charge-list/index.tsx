import { LoadingSpinner } from "~/components/loading";
import { api } from "~/utils/api";
import { PicTable } from "./pic-table";
import { columnsPic } from "./columnsPic";

export const PersonInChargeList = (): JSX.Element => {
  const picListQuery = api.pic.picList.useQuery();

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      {picListQuery.isLoading && <LoadingSpinner />}
      {picListQuery.status === "success" && (
        <PicTable data={picListQuery.data} columns={columnsPic} />
      )}
    </div>
  );
};
