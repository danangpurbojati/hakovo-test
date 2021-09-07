import React, {useState,useEffect} from "react";
import { Layout } from 'antd';

import { useRequestRecommendations } from "../../utils/actions/dashboard";
import { HSTable } from "../../components/hstable";

const { Content, Header } = Layout;

localStorage.setItem("recommendations_data",JSON.stringify({}));

export default function Dashboard(){

    const [commodityList,setCommodityList] = useState([]);
	const [requestRecommendations] = useRequestRecommendations();

    // task: solve reactjs problem, to solve like given design
    // i added asynchonous function here, because fetching data from api
    const handleFindRecommendations = async (text) =>{
        const formData = new FormData();
        formData.append('text',text);
        
        await requestRecommendations(formData);
        
        var result = JSON.parse(localStorage.getItem("recommendations_data"));
        if(result) setCommodityList(result);        
    }


    useEffect(()=> handleFindRecommendations('linen'), []);
    
    return (
        <Layout className="ctnr-hs-input" style={{backgroundColor:'#FFF'}}>
            {/*task: add desain header to react page */}
            <Header theme="light">
                <h1 style={{color: '#FFF', fontWeight: 'bold'}}>Hakovo - React Test</h1>
            </Header>

            <Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content">

                    {/* task: solve reactjs problem, to solve like given design */}
                    {/* added props here */}
                    <HSTable commodityList={commodityList} />

                </div>
            </Content>
        </Layout>
    );
}