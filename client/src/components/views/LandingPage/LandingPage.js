import React, { useEffect,useState } from 'react'
import { FaCode } from "react-icons/fa";
import axios from 'axios';
import {Icon, Col, Card, Row, Carousel} from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/Checkbox'
import Continets from './Sections/Datas'

function LandingPage() {

    const[Products, setProducts] = useState([])
    const[Skip, setSkip] = useState(0)
    const[Limit,setLimit] = useState(4)
    const[PostSize, setPostSize] = useState(0)

    useEffect(() => {

        let body = {
            skip : Skip,
            limit : Limit
        }

        getProducts(body)
        
    },[])

    const getProducts = (body) => {
        axios.post('api/product/products', body)
        .then(response => {
            if(response.data.success) {
                if(body.loadMore){
                    setProducts( [...Products, ...response.data.product]) // 기존에 Products 객체를 복사하고 새로운 데이터를 넣는다.
                } else {
                    setProducts(response.data.product) // default
                }
                setPostSize(response.data.postSize)
            } else {
                alert('상품을 가져오는데 실패했습니다.');
            }
        })
    }

    const loadMoreHandler = () => {
        let skip = Skip + Limit

        let body = {
            skip :skip,
            limit : Limit,
            loadMore : true,
        }

        getProducts(body)
        setSkip(skip)
    }

    const renderCards = Products.map((product, index) => {
        return <Col lg={6} md={8} xs={24} key={index}>
            <Card 
                cover = {<ImageSlider images={product.images} />}
            >
                <Meta title={product.title} description={`$${product.price}`}/>
            </Card>
        </Col>
    })

    return (
            <div style={{ width :'75%', margin : '3rem auto'}}>
                <div style={{textAlign : 'center'}}>
                    <h2>Let's Travel Anywhere<Icon type="rocket"/></h2>
                </div>
                
                {/* Filter */}

                {/* Check Box*/}
                    <CheckBox list={Continets}/>

                {/* Search */}

                {/* Cards */}
                <Row gutter={[16,16]}>
                    {renderCards}
                </Row>

                {/* PostSize가 Limit보다 크거나 같으면 Limit 버튼 보여주기. */}
                {PostSize >= Limit &&
                    <div style={{ textAlign:'center',justifyContent : 'center'}}>
                        <button onClick={loadMoreHandler}>더보기</button>
                    </div>                
                }

            </div>
    )
}

export default LandingPage
