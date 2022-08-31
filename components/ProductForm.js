import { useContext, useState } from "react";
import { CartContext } from "../context/shopContext";
import { formatter } from "../utils/helpers";
import ProductOptions from "./ProductOptions";

export default function ProductForm({ product }) {
	// creates add to cart function used in button
	// need to destructure the object to access it
	const { ...addToCart } = useContext(CartContext);

	// maps over all the products variants
	const allVariantOptions = product.variants.edges?.map((variant) => {
		const allOptions = {};

		// maps over selectedOptions and saves them into all Options as key value pairs
		variant.node.selectedOptions.map((item) => {
			allOptions[item.name] = item.value;
		});
		return {
			id: variant.node.id,
			title: product.title,
			handle: product.handle,
			image: variant.node.image?.originalSrc,
			options: allOptions,
			variantTitle: variant.node.title,
			variantPrice: variant.node.priceV2.amount,
			variantQuantity: 1,
		};
	});
	// having selected default values which are the 0th index of the options object (first option is default)
	const defaultValues = {};
	product.options.map((item) => {
		defaultValues[item.name] = item.values[0];
	});

	const [selectedVariant, setSelectedVariant] = useState(allVariantOptions[0]);
	const [selectedOptions, setSelectedOptions] = useState(defaultValues);

	// taking in previous state for options and changing it to new selected option
	function setOptions(name, value) {
		setSelectedOptions((prevState) => {
			return { ...prevState, [name]: value };
		});

		const selection = {
			...selectedOptions,
			[name]: value,
		};
		// if item option equals the users selection then it is setting variant state to the item selected
		allVariantOptions.map((item) => {
			if (JSON.stringify(item.options) === JSON.stringify(selection)) {
				setSelectedVariant(item);
			}
		});
	}

	return (
		<div className='rounded-2xl p-4 shadow-lg flex flex-col w-full md:w-1/3'>
			<h2 className='text-2xl font-bold'>{product.title}</h2>
			<span className='pb-3'>
				{formatter.format(product.variants.edges[0].node.priceV2.amount)}
			</span>

			{/* creates the two separate forms containing the product options because of the map*/}
			{product.options.map(({ name, values }) => {
				return (
					<ProductOptions
						key={`key-${name}`}
						name={name}
						values={values}
						selectedOptions={selectedOptions}
						setOptions={setOptions}
					/>
				);
			})}
			<button
				// adding the selected variant to the cart
				onClick={() => addToCart(selectedVariant)}
				className='bg-black rounded-lg text-white px-2 py-3 hover:bg-gray-800 mt-3'
			>
				Add To Cart
			</button>
		</div>
	);
}
