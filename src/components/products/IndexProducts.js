import React, { useState, useEffect } from 'react'
import { getAllProducts } from '../../api/products'
import { Card } from "react-bootstrap"
import { Link } from 'react-router-dom'

const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap',
}

const IndexProducts = (props) => {
        const [products, setProducts] = useState(null)
        const { user, msgAlert } = props
        useEffect(()=> {
            getAllProducts()
                .then(res => {
                    console.log('this is the res', res)
                    setProducts(res.data.products)
                })
                .then(()=> {
                    msgAlert({
                        heading:"Found Products",
                        // message: indexPetsSuccess,
                        variant: 'success'
                    })
                })
                .catch(() => 
                    msgAlert({
                        heading:"No products?!",
                        // message: indexPetsFailure,
                        variant: 'danger'
                    }))
            },[])


        // let productCards
        // if(products.length > 0) {

        //    let productsJsx = products.map( product => (
        //         <li>
        //             {product.name}
        //         </li>
        //     ))
        //      productCards = products.map(product => (
        //         // one method of styling usually reserved for a single style we can use inline
        
        //         <Card key ={product._id} style={{ width: '30%'}} className="m-2">
        //             <Card.Header>
        //                 {product.name}
                        
        //             </Card.Header>
        //             <Card.Body>
        //                 <Card.Text>
        //                     {product.description}
        //                     {product.price}
        //                     {/* <Link to={`/pets/${pet.id}`}> View {pet.name}</Link> */}
        //                 </Card.Text>
        //             </Card.Body>
        //         </Card>
        //     ))
        // }
        if (!products) {
            return <p>loading...</p>
        } else if (products.length === 0) {
            return <p>no pets yet, go add some</p>
        }

        let productCards

        if (products.length > 0) {
            productCards = products.map(product => (
                <div key={product.id} style={{ width:'300px'}}>
                    <Link to={`/products/${product._id}`} style={{overflowWrap: 'break-word'}} >{product.name}</Link>
                    <img src={`${product.image}`} style={{ height: '200px'}} class='img-thumbnail' />
                    <p>$ {product.price}</p>
                </div>
            ))
        }

        return(
            <>
                <h3>All The Products</h3>
                {/* using an inline style with an object declared above */}
                <div style={cardContainerLayout}>
                    {productCards}
                </div>
               
            </>
        )

}

export default IndexProducts

// wonder woman