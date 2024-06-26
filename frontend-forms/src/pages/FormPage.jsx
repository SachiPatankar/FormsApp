import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { IoIosRefresh } from "react-icons/io";
import * as Yup from "yup";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import axios from "axios"

const FormPage = () => {
    const { formType } = useParams();
    const [formData, setFormData] = useState({
        type: formType,
        name: "",
        code: "",
        number: "",
    });

    const [errors, setErrors] = useState({});
    const[success, setSuccess] = useState(false)
    const[updated, setUpdated] = useState(false)

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is Required"),
        number: Yup.string()
            .required("Number is required"),
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await validationSchema.validate(formData, { abortEarly: false });
            console.log(formData);
            await axios.post('/info/post', formData);
            console.log("Form Submitted")
            setErrors({})
            setSuccess(true)
        } catch (error) {
            console.log(error.message)
            const newErrors = {};
            error.inner.forEach((err) => {
                newErrors[err.path] = err.message;
            });

            setErrors(newErrors);
        }
    };

    const handleRefresh = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/sheet/post');
            console.log("Sheet updated")
            setUpdated(true)
        } catch (error) {
            console.log(error.message)
        }


    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handlePhoneChange = (value, country, e, formattedValue) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            code: country.dialCode,
            number: value.slice(country.dialCode.length),
        }));
    };

    const theme = formType === 'A' ? 'purple' : 'blue';
    const bgColor = theme === 'purple' ? 'bg-[#f7f0fc]' : 'bg-[#f0f6fc]';
    const buttonColor = theme === 'purple' ? 'bg-purple-500 hover:bg-purple-600' : 'bg-blue-500 hover:bg-blue-600';

    return (
        <div className={`min-h-screen flex justify-center items-center ${bgColor}`}>
            <div className={`w-full max-w-md p-8 rounded-xl bg-white`}>
                <div className='flex justify-end'>
                    <div className='bg-green-500 p-2 rounded-full text-white cursor-pointer' onClick={handleRefresh}>
                        <IoIosRefresh />
                    </div>
                </div>
                <h1 className={`text-2xl font-bold mb-6 text-center ${theme === 'purple' ? 'text-purple-700' : 'text-blue-700'}`}>
                    Form {formType}
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block mb-2 font-medium">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                            required
                        />
                        {errors.name && <div className="text-sm text-red-600 p-2 ">{errors.name}</div>}
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Phone Number:</label>
                        <PhoneInput
                            country={'us'}
                            onChange={handlePhoneChange}
                            inputProps={{
                                name: 'phone',
                                required: true,
                                autoFocus: true,
                            }}
                        />
                        {errors.number && <div className="text-sm text-red-600 p-2">{errors.number}</div>}
                    </div>
                    <button type="submit" className={`w-full p-2 text-white rounded-md ${buttonColor}`}>
                        Submit
                    </button>
                    
                </form>
                <div className='flex flex-col gap-2 m-2'>
                {success && <div className="text-sm text-green-600 bg-green-50 rounded-md p-2">Form submitted successfully</div>}
                {updated && <div className="text-sm text-green-600 bg-green-50 rounded-md p-2">Sheet updated successfully</div>}
                </div>
            </div>
        </div>
    );
}

export default FormPage;

