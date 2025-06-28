import { useState } from "react";
import { Link } from "react-router";



const PrivateDashboard = () => {
    const [search, setSearch] = useState("");

    const handleRemoveFilter = () => {
        setSelectedBrand("");
        setSelectedCategory("");
        setSearch("");
        setFiltered(products);
    };

    return (
        <div className='min-h-screen bg-gradient-to-b from-white to-gray-200'>
            <div className='flex justify-between py-3 md:px-[15%] px-2 bg-white border-1 border-b-[#4b7fbb42]'>
                <div className='flex gap-1'>
                    <h1 className='outfit text-lg font-bold my-auto'><span className='text-[#3B6FA1]'>Paw</span><span className='text-gray-700'>Pals</span></h1>
                    <img src="/images/icons/paw.png" alt="paw" className='w-5 h-5 m-auto' />
                </div>
                <button className='py-2 px-3 text-xs rounded-lg text-white font-semibold bg-[#4B7FBB] hover:bg-[#416da0] active:bg-[#416da0] transition-colors ease-in-out duration-300 cursor-pointer'>Kennel Login</button>
            </div>
            <div className="relative flex gap-5 justify-center items-center md:w-[65%] md:mx-auto bg-[#eef2f7] rounded-lg py-2 px-3 mb-3 mt-4 mx-5 border-2 border-[#eef2f7] focus-within:border-[#4B7FBB] focus-within:bg-white transition-colors duration-300 text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <input
                    type="text"
                    placeholder="Search for pets... (by name or breed etc.)"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="block w-[100%] outline-none placeholder-gray-400"
                />
                <button
                    onClick={handleRemoveFilter}
                    className={`absolute right-0 top-0 text-white rounded-r-md p-[10px] bg-[#4B7FBB] cursor-pointer hover:scale-110 ease-in-out duration-300
                            ${search ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div className="py-2 md:px-[12vw] mb-3 text-center">
                <div className="flex justify-center">
                    <div className="flex relative overflow-hidden">
                        {/* {brands.map((brand) => ( */}
                        <div className="flex flex-col gap-1 md:mx-2 mx-[5px] my-2">
                            <button
                                // key={brand._id}
                                // onClick={() => handleBrandClick(brand.name)}
                                // className={`outline-5 flex-none rounded-xl md:mx-2 mx-[5px] my-2 bg-white w-20 h-20 cursor-pointer duration-300 ease-in-out hover:scale-105
                                //                 ${selectedBrand === brand.name ? "outline-[#990000]" : "outline-white/0"}`}

                                //TEMPORARY
                                className='flex-none rounded-xl bg-[#eef2f7] w-17 h-17 cursor-pointer duration-300 ease-in-out hover:bg-[#dce3ee]'
                            >
                                <img
                                    // src={brand.logo?.url.replace("/upload/", "/upload/w_500,/")}
                                    // alt={brand.name}
                                    // className="w-[50px] mx-auto"

                                    //TEMPORARY
                                    src="/images/icons/dog.png"
                                    className="w-[35px] mx-auto"
                                />
                            </button>
                            <p className="text-xs text-gray-600">Dogs</p>
                        </div>
                        {/* ))} */}


                        {/* TEMPORARY */}
                        <div className="flex flex-col gap-1 mx-[5px] my-2">
                            <button
                                className='flex-none rounded-xl md:mx-2 bg-[#4B7FBB] w-17 h-17 cursor-pointer duration-300 ease-in-out hover:bg-[#dce3ee]'
                            >
                                <img
                                    src="/images/icons/cat.png"
                                    className="w-[35px] mx-auto"
                                />
                            </button>
                            <p className="text-xs text-gray-600">Cats</p>
                        </div>
                        <div className="flex flex-col gap-1 mx-[5px] my-2">
                            <button
                                className='flex-none rounded-xl md:mx-2 bg-[#eef2f7] w-17 h-17 cursor-pointer duration-300 ease-in-out hover:bg-[#dce3ee]'
                            >
                                <img
                                    src="/images/icons/bird.png"
                                    className="w-[35px] mx-auto"
                                />
                            </button>
                            <p className="text-xs text-gray-600">Birds</p>
                        </div>
                    </div>

                    <div className="w-[3px] h-22 my-auto bg-gray-300 rounded-full mx-2"></div>



                    {/* GENDER - TEMPORARY */}
                    <div className="flex flex-col justify-center gap-3 items-center py-2 md:mx-3 mx-[5px]">
                        <div className="flex justify-center py-[3px] px-[4px] text-xs bg-[#eef2f7] w-25 rounded-md hover:bg-[#dce3ee] cursor-pointer transition-colors duration-300">
                            <p className="m-auto text-gray-600">Male</p>
                            <img src="/images/icons/male.png" alt="male" className="w-6" />.
                        </div>
                        <div className="flex justify-center py-[3px] px-[4px] text-xs bg-[#eef2f7] w-25 rounded-md hover:bg-[#dce3ee] cursor-pointer transition-colors duration-300">
                            <p className="m-auto text-gray-600">Female</p>
                            <img src="/images/icons/female.png" alt="female" className="w-6" />
                        </div>
                    </div>

                </div>



            </div>



            <div className="flex flex-wrap justify-center ">
                {/* {filtered.map((product) => ( */}
                <Link
                    // to={`/products/${product._id}`}
                    // key={product._id}
                    className="md:m-5 m-3"
                >
                    <div className="group">
                        <div className="overflow-hidden rounded-t-lg bg-black">
                            <img
                                // src={product.image.url.replace("/upload/", "/upload/c_fill,w_1000,h_563/")}
                                // alt={product.name}
                                className="md:w-[300px] md:h-[300px] w-[150px] h-[150px] object-cover rounded-t-lg group-hover:scale-115 group-active:scale-115 ease-in-out duration-500"

                                // TEMPORARY
                                src="https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBldHN8ZW58MHx8MHx8fDA%3D"
                            />
                        </div>
                        <div className="bg-white p-3 md:px-5 rounded-b-lg z-1 group-hover:bg-[#4B7FBB] group-active:bg-[#4B7FBB] transition-colors duration-300 flex justify-between">
                            {/* <h3 className="text-lg font-bold group-hover:text-white group-active:text-white">{product.name}</h3>
                                <p className="text-sm [#4B7FBB] group-active:text-white">{formatPeso(product.price)}</p> */}

                            {/* TEMPORARY */}
                            <div>
                                <p className="font-semibold group-active:text-white group-hover:text-white transition-colors duration-300">Name</p>
                                <p className="text-sm group-active:text-white group-hover:text-white transition-colors duration-300 text-gray-400">Breed</p>
                            </div>
                            <img src="/images/icons/female.png" alt="female" className="w-6 h-6 my-auto" />
                        </div>
                    </div>
                </Link>
                {/* ))} */}


                {/* TEMPORARY */}
                <Link
                    className="md:m-5 m-3"
                >
                    <div className="group">
                        <div className="overflow-hidden rounded-t-lg bg-black">
                            <img

                                className="md:w-[300px] md:h-[300px] w-[150px] h-[150px] object-cover rounded-t-lg group-hover:scale-115 group-active:scale-115 ease-in-out duration-500"

                                // TEMPORARY
                                src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGV0c3xlbnwwfHwwfHx8MA%3D%3D"
                            />
                        </div>
                        <div className="bg-white p-3 md:px-5 rounded-b-lg z-1 group-hover:bg-[#4B7FBB] group-active:bg-[#4B7FBB] transition-colors duration-300 flex justify-between">

                            <div>
                                <p className="font-semibold group-active:text-white group-hover:text-white transition-colors duration-300">Name</p>
                                <p className="text-sm group-active:text-white group-hover:text-white transition-colors duration-300 text-gray-400">Breed</p>
                            </div>
                            <img src="/images/icons/male.png" alt="male" className="w-6 h-6 my-auto" />
                        </div>
                    </div>
                </Link>
                <Link
                    className="md:m-5 m-3"
                >
                    <div className="group">
                        <div className="overflow-hidden rounded-t-lg bg-black">
                            <img

                                className="md:w-[300px] md:h-[300px] w-[150px] h-[150px] object-cover rounded-t-lg group-hover:scale-115 group-active:scale-115 ease-in-out duration-500"

                                // TEMPORARY
                                src="https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBldHN8ZW58MHx8MHx8fDA%3D"
                            />
                        </div>
                        <div className="bg-white p-3 md:px-5 rounded-b-lg z-1 group-hover:bg-[#4B7FBB] group-active:bg-[#4B7FBB] transition-colors duration-300 flex justify-between">

                            <div>
                                <p className="font-semibold group-active:text-white group-hover:text-white transition-colors duration-300">Name</p>
                                <p className="text-sm group-active:text-white group-hover:text-white transition-colors duration-300 text-gray-400">Breed</p>
                            </div>
                            <img src="/images/icons/male.png" alt="male" className="w-6 h-6 my-auto" />
                        </div>
                    </div>
                </Link>
            </div>
        </div>

    )
}

export default PrivateDashboard
