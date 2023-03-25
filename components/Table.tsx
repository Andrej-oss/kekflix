import { CheckIcon } from '@heroicons/react/outline'
import {Product} from "../models/product";

interface Props {
    products: Product[] | undefined
    selectedPlan: Product | null
}

function Table({ products, selectedPlan }: Props) {
    return (
        <table>
            <tbody className="divide-y divide-[gray]">
            <tr className="tableRow">
                <td className="tableDataTitle">Monthly price</td>
                {products && products.map((product) => (
                    <td
                        className={`tableDataFeature ${
                            selectedPlan?.id === product.id
                                ? 'text-[#E50914]'
                                : 'text-[gray]'
                        }`}
                        key={product.id}
                    >
                        {product && product.price?.unit_amount && product.price?.unit_amount / 100}
                        {product.price && product.price.currency}
                    </td>
                ))}
            </tr>
            <tr className="tableRow">
                <td className="tableDataTitle">Video quality</td>
                {products && products.map((product) => (
                    <td
                        className={`tableDataFeature ${
                            selectedPlan?.id === product.id
                                ? 'text-[#E50914]'
                                : 'text-[gray]'
                        }`}
                        key={product.id}
                    >
                        {product.metadata.videoQuality}
                    </td>
                ))}
            </tr>
            <tr className="tableRow">
                <td className="tableDataTitle">Resolution</td>
                {products && products.map((product) => (
                    <td
                        className={`tableDataFeature ${
                            selectedPlan?.id === product.id
                                ? 'text-[#E50914]'
                                : 'text-[gray]'
                        }`}
                        key={product.id}
                    >
                        {product.metadata.resolution}
                    </td>
                ))}
            </tr>
            <tr className="tableRow">
                <td className="tableDataTitle">
                    Watch on your TV, computer, mobile phone and tablet
                </td>
                {products && products.map((product) => (
                    <td
                        className={`tableDataFeature ${
                            selectedPlan?.id === product.id
                                ? 'text-[#E50914]'
                                : 'text-[gray]'
                        }`}
                        key={product.id}
                    >
                        {product.metadata.portability === 'true' && (
                            <CheckIcon className="inline-block h-8 w-8" />
                        )}
                    </td>
                ))}
            </tr>
            </tbody>
        </table>
    )
}

export default Table