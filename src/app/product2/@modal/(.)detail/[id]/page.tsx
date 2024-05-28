import getData from "@/components/GetData/GetData";
import Image from "next/image";
import ModalWrapper from "@/components/core/modal/";
export default async function DetailProductPage(props: any) {
  const { params } = props;
  const data = await getData("https://fakestoreapi.com/products/" + params.id);
  return (
    <ModalWrapper>
      <Image
        className="w-full object-cover aspect-square col-span-2"
        src={data.image}
        alt="product image"
        width="0"
        height="0"
        sizes="100vw"
      />
      <div className="bg-white p-4 x-6">
        <h3>{data.title}</h3>
        <p>price : ${data.price}</p>
      </div>
    </ModalWrapper>
  );
}
