import getData from '@/components/GetData/GetData';
import Image from 'next/image';
export default async function DetailProductPage(props: any) {
   const {params} = props;
   const data = await getData('https://localhost:3000/products?id='+params.id);   
    return (
        <div className="container mx-auto my-10 flex items-center">
            <div className="w-1/2 mx-auto border border-gray-700">
            <Image
                className="w-full object-cover aspect-square col-span-2"
                src={data.image}
                alt="product image"
                width="0"
                height="0"
                sizes="100vw"
                
              />
              <div className='bg-white p-4 x-6'>
                <h3>{data.title}</h3>
                <p>price : ${data.price}</p>
                </div>       
            </div>
        </div>
    )
}