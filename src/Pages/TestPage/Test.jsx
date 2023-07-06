import { useState } from 'react';
import './styles.css'
import { BiImageAdd} from 'react-icons/bi'


const intialState = {
    title: '', message: '', tags: '', selectedFile: ''
}

function Test() {

    const [formData, setFormData] = useState(intialState)
    const handleInput = (e) => {
        console.log(e.target.files);
        const selectedfile = e.target.files;
        if (selectedfile.length > 0) {
            const [imageFile] = selectedfile;
            const fileReader = new FileReader();
            fileReader.onload = () => {
                const srcData = fileReader.result;
                setFormData((s)=>{ return {...s, image : srcData}})
                
            };
            fileReader.readAsDataURL(imageFile);
        }
    }
    console.log(formData)
    const handleSubmit = () => {
     
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label className="custom-file-upload">
                    <input type="file" onInput={handleInput} />
                   <BiImageAdd/>
                </label>
            </form>
            {}
            <img src={formData.image} alt=''/>

        </div>
    )
}

export default Test