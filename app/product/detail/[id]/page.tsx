import { getData } from '../../../../components/core/GetData/GetData';
import Image from 'next/image';
export default async function DetailProductPage(props: any) {
  const { params } = props;
  const data = await getData('https://localhost:3000/products?id=' + params.id);
  return (
    <div className="container mx-auto my-10 flex items-center">
      <div className="mx-auto w-1/2 border border-darkb">
        <Image
          className="col-span-2 aspect-square w-full object-cover"
          src={data.image}
          alt="product image"
          width="0"
          height="0"
          sizes="100vw"
        />
        <div className="x-6 bg-white p-4">
          <h3>{data.title}</h3>
          <p>price : ${data.price}</p>
        </div>
      </div>
    </div>
  );
}
