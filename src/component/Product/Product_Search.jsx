import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useAxiosJWT, useCurrentUser, useMutationProducts } from "./api";


function ProductsSearch() {

  const { register, handleSubmit, formState: { errors } } = useForm({ });
  const useSearch = useMutationProducts()
  const currentUser = useCurrentUser()
  const axiosJWT = useAxiosJWT()
 const queryClient = useQueryClient()
const handleSearch= async (e)=>{
 
  const searchKey= e.search
 await queryClient.setQueryData(["searchKey"],searchKey)
const  search = await queryClient.getQueryData(["searchKey"])
console.log(search)
  useSearch.mutate({axiosJWT,currentUser,search})
}
  return ( 
    <div className="flex items-center">
    <form onSubmit={handleSubmit((e)=>{
        handleSearch(e)
    })} className="flex space-x-1">
        <input {...register("search")}
            type="text"
            className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-full focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Search..."
        />
        <button type="submit" className="px-4 text-white bg-purple-600 rounded-full ">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
            </svg>
        </button>
    </form>
</div>
   );
}

export default ProductsSearch;