const Filter = () => {
    return (
        <div className='mt-12 flex justify-between'>
            <div className='flex gap-6 flex-wrap'>
                <select name="type" id="" className="py-2 px-4 rounded-2xl text-xs font-medium bg-gray-200">
                    <option>Type</option>
                    <option value="physical">Physical</option>
                    <option value="digital">Digital</option>
                </select>
                <select name="type" id="" className="py-2 px-4 rounded-2xl text-xs font-medium bg-gray-200">
                    <option>Category</option>
                    <option value="physical">Physical</option>
                    <option value="digital">Digital</option>
                </select>
                <select name="type" id="" className="py-2 px-4 rounded-2xl text-xs font-medium bg-white ring-1 ring-gray-400">
                    <option>Sort By</option>
                    <option value="">Price (low to high)</option>
                    <option value="">Price (high to low)</option>
                    <option value="">Newest</option>
                    <option value="">Oldest</option>
                </select>
            </div>
        </div>
    )
}

export default Filter
