import React, { useState, useRef, useEffect } from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.min.css';
import './Header2.css';
import { MdHandyman } from "react-icons/md";
import Snowfall from 'react-snowfall';
import { FaStar } from "react-icons/fa";

const Header2 = ({ selectedImage, toggleHeader }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [count, setCount] = useState(0);
  const [showStitchesButton, setShowStitchesButton] = useState(true);
  const [cropperActive, setCropperActive] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [cropperVisible, setCropperVisible] = useState(false);
  const [showDLButton, setShowDLButton] = useState(false);
  const fileInputRef = useRef(null);
  const imageRef = useRef(null);
  const cropperRef = useRef(null);


  //Thêm ảnh
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  //Đếm số ảnh
  const increaseCount = () => {
    setCount(count + 1);
  };

  //Bộ cập nhật ảnh (thêm, chỉnh sửa)
  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.includes('image')) {
      setSelectedImages([...selectedImages, URL.createObjectURL(file)]);
      increaseCount(); // Tăng giá trị count khi chọn hình ảnh
      setCropperActive(true);
    }
  };

  //Ghép ảnh
  // const handleStitchImages = () => {
  //   if (selectedImages.length >= count - 1) {
  //     const imageToDownload = selectedImages[count - 2]; // Lấy ảnh thứ count - 1
  //     if (imageToDownload) {
  //       setEditingImage(imageToDownload); // Lưu ảnh được chỉnh sửa vào state
  //       setShowDLButton(true);
  //     }
  //   }
  // };

  async function runLinuxCommand() {
    // const commandInput = document.getElementById('commandInput');
    // const outputDiv = document.getElementById('output');
    // const detailsDiv = document.getElementById('details');

    const command = "bash build.sh";

    try {
      const response = await fetch('http://localhost:3001/runcmd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ command }),
      });

      const result = await response.json();
      // outputDiv.innerText = `Command Output:\n${result.output}`;
      // detailsDiv.innerText = `Command: ${result.command}\nExit Code: ${result.exitCode}\nError: ${result.error || 'None'}`;
    } catch (error) {
      console.error('Error:', error);
      // outputDiv.innerText = 'Error occurred. Check the console for details.';
    }

    //   if (selectedImages.length >= count - 1) {
    //   const imageToDownload = selectedImages[count - 2]; // Lấy ảnh thứ count - 1
    //   if (imageToDownload) {
    //     setEditingImage(imageToDownload); // Lưu ảnh được chỉnh sửa vào state
    //     setShowDLButton(true);
    //   }
    // }

            setShowDLButton(true);

  }

  //Bộ chỉnh sửa ảnh
  const handleEditImage = (image) => {
    setEditingImage(image); // Lưu ảnh đang được chỉnh sửa vào state
    setCropperVisible(true); // Hiển thị bộ chỉnh sửa ảnh
  };

  //Bộ chỉnh sửa ảnh
  useEffect(() => {
    if (cropperVisible) {
      // Khởi tạo Cropper khi chỉnh sửa ảnh được kích hoạt
      cropperRef.current = new Cropper(imageRef.current, {
        aspectRatio: NaN,
        viewMode: 2,
        crop(event) {
          // Đoạn code xử lý khi kết thúc việc cắt ảnh
        },
      });
    } else {
      // Hủy đối tượng Cropper nếu không còn kích hoạt nữa
      if (cropperRef.current) {
        cropperRef.current.destroy();
        cropperRef.current = null;
      }
    }
  }, [cropperVisible]);

  //Bộ chỉnh sửa ảnh
  const handleConfirmCrop = () => {
    const croppedImageDataURL = cropperRef.current.getCroppedCanvas().toDataURL();
    const updatedSelectedImages = [...selectedImages];
    updatedSelectedImages.splice(updatedSelectedImages.indexOf(editingImage), 1, croppedImageDataURL);
    setSelectedImages(updatedSelectedImages);
    setCropperVisible(false);
  };


  //Bộ chỉnh sửa ảnh
  const handleCancelCrop = () => {
    // Hủy bỏ chế độ chỉnh sửa ảnh
    setCropperVisible(false);
  
    // Nếu đã có ảnh đang được chỉnh sửa, không thực hiện bất kỳ thay đổi nào
    if (editingImage !== null) {
      setEditingImage(null);
    }
  };


  //Bộ ảnh
  const renderSelectedImages = () => {
    return selectedImages.map((image, index) => (
      <button key={index} onClick={() => handleEditImage(image)}>
        <img className='pic' src={image} alt={`Selected ${index + 1}`} />
      </button>
    ));
  };

  //Tải ảnh về
  const handleDownloadAllImages = () => {
    selectedImages.forEach((image, index) => {
      const link = document.createElement('a');
      link.href = image;
      link.download = `image_${index + 1}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  
    downloadCountToFile(); // Gọi hàm tải xuống count.txt sau khi tải hình ảnh
  };
  
  const downloadCountToFile = () => {
    const countData = `${count}`;
    const file = new Blob([countData], { type: 'text/plain' });
  
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = 'count.txt';
  
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  //Xóa ảnh
  const resetImages = () => {
    if (selectedImages.length > 0) {
      const updatedImages = [...selectedImages];
      updatedImages.pop(); // Xóa bức ảnh gần nhất
      setSelectedImages(updatedImages); // Cập nhật danh sách ảnh
  
      // Giảm count nếu count lớn hơn 0
      if (count > 0) {
        setCount(count - 1);
      }
    }
  };

  const downloadResultImage = async () => {
    const command = "bash clear.sh";

    try {



      // First API request to download file
     const response1 = await fetch('http://localhost:3001/get-file') // Địa chỉ endpoint trên máy chủ
      .then(response => {
        return response.blob(); // Chuyển đổi response thành dạng blob
      })
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'resultNew.jpg');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch(error => {
        console.error('Error downloading the file:', error);
      });
  
      const response2 = await fetch('http://localhost:3001/clearMemory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ command }),
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <section className='header2'>
      <Snowfall snowflakeCount={100} />
      <div className='header-left'>
        <div className='header-left-top'>
          <button className='button1' onClick={handleButtonClick}>
            Input Images
          </button>
          <input
            type='file'
            accept='.jpg,.jpeg,.png'
            onChange={handleImageSelect}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
          <button className='button2' onClick={runLinuxCommand}>
            Stitch Images
          </button>
        </div>
        <div className='header-left-bot'>
          <div className='images-container'>
          {cropperVisible ? (
            <div>
              <img ref={imageRef} src={editingImage} alt='Selected' className='cropper-image'/>
              <button className="confirm-button" onClick={handleConfirmCrop}>Confirm</button>
              <button className="cancel-button" onClick={handleCancelCrop}>Cancel</button>
            </div>
          ) : (
            renderSelectedImages()
          )}
          </div>
        </div>
      </div>
      <div className='header-right'>
        <div className='logoo'>
          <p className='nums'>SETING UP</p> 
          <FaStar color='yellow' size={60}/>
        </div>

        {showDLButton && (
          <button className='DL-button' onClick={downloadResultImage}>
            Download
          </button>
        )}

        <button className='reset-page-button' onClick={toggleHeader}>
          Reset page
        </button>

        <button className='reset-image-button' onClick={resetImages}>
          Reset pre images
        </button>
        {showStitchesButton && (
          <button className='reset-button' onClick={handleDownloadAllImages}>
            Confirm Stitched Images
          </button>
        )}
        
      </div>
    </section>
  );
};

export default Header2;
