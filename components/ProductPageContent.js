import Image from "next/image";
import ProductForm from "./ProductForm";

function ProductPageContent({ product }) {
	return (
		<div className='flex flex-col justify-center items-center space-y-8 md:flex-row md:items-start md:space-y-0 md:'>
			<div className='w-full max-w-md border bg-white rounded-2xl overflow-hidden shadow-lg md:w-1/2'>
				<div className='relative h-96 w-full'>
					<Image
						src={product.images.edges[0].node.originalSrc}
						alt={product.images.edges[0].node.altText}
						layout='fill'
						objectFit='cover'
					/>
				</div>
			</div>
			<ProductForm product={product} />
		</div>
	);
}

export default ProductPageContent;
