import ProductImages from "../components/ProductImages";
import CustomizeProducts from "../components/CustomizeProducts";
import Add from "../components/Add";

const SinglePage = () => {
    return (
        <div className='px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 relative flex flex-col lg:flex-row gap-16'>
            {/* IMG */}
            <div className='w-full lg:w-1/2 lg:sticky top-20 h-max'>
                <ProductImages/>
            </div>
            {/* TEXTS */}
        <div className='w-full lg:w-1/2 flex flex-col gap-6'></div>
        <h1 className="text-4xl font-medium">Product Name</h1>
            <p className='text-gra-500'>
                ayeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        </p>
            <div className='h-[2px] bg-gra-100' />
            <div className='flex imtes-center gap-4'>
                <h3 className="text-xl text-gray-500 line-through">¥6000</h3>
                <h3 className="text-xl text-gray-2xl">¥7000</h3>
            </div>
            <div className="h-[2px] bg-gray-100" />
            <CustomizeProducts />
            <Add />
            <div className="h-[2px] bg-gray-100" />
            <div className="text-sm">
                <h4 className="font-medium mb-4">Title</h4>
                <p>
                    ayteeeeeeeeeeeeeeeeeeeeeeeeeeeee
                </p>
            </div>
        </div>
    )
}

export default SinglePage
