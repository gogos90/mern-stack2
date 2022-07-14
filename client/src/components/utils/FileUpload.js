import React ,{useState} from 'react'
import Dropzone from 'react-dropzone'
import {Icon} from 'antd';
import axios from 'axios';

function FileUpload(props) {

  const [Images,setImages] = useState([])

  const dropHandler = (files) => {

    let formData = new FormData();

    const config = {
      header : {'content-type' : 'multipart/form-data'}
    }

    formData.append('file',files[0]);

    axios.post('/api/product/image', formData , config )
    .then( response => {
      if(response.data.success){
          // 이미지  올렸을때,,
          setImages([...Images, response.data.filePath])
          props.refreshFunction([...Images, response.data.filePath]) // 부모 : UploadProductPage 의 Image 상태값도 update

      } else {
        alert('파일 저장을 실패하였습니다.')
      }
    });

  }

  const deleteHandler  = (image) => {

    const currentIndex = Images.indexOf(image)

    let newImages = [...Images,]

    // index부터 n개 제거
    newImages.splice(currentIndex, 1)

    // 제거하고 남은 이미지 배열을 다시 Image에 넣어준다.
    setImages(newImages)

    props.refreshFunction(newImages) // 부모 : UploadProductPage 의 Image 상태값도 update

  }


  return (
    <div style={{ display : 'flex', justifyContent:'space-between'}}>
        <Dropzone onDrop={dropHandler}>  
        {({getRootProps, getInputProps}) => (
            <section>
            <div style={{ width : 300, height : 240, border : '1px solid lightgray',
                          display :'flex' , alignItems : 'center' , justifyContent : 'center'
                }} 
                {...getRootProps()}>
                <input {...getInputProps()} />
                <Icon type="plus" style={{fontSize : '3rem'}} />
            </div>
            </section>
        )}
        </Dropzone>

        <div style={{ display : 'flex', width :'350px', height:'240px', overflow : 'scroll'}}>
          
          {Images.map((image,index) =>(
              <div onClick={()=> deleteHandler(image)} key={index}>
                  <img style={{minWidth : '300px', width:'300px', height : '240px' }} src={`http://localhost:5000/${image}`}/>
              </div>
          ))}

           
        </div>
    </div>
  )
}

export default FileUpload