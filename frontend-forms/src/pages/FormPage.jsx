// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { IoIosRefresh } from "react-icons/io";
// import * as Yup from "yup";
// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';
// import { parsePhoneNumberFromString } from 'libphonenumber-js';

// const FormPage = () => {
//     const { formType } = useParams();
//     const [formData, setFormData] = useState({
//         type: formType,
//         name: "",
//         code: "",
//         number: "",
//     });

//     const [phone, setPhone] = useState();
//     const [errors, setErrors] = useState({});

//     const validationSchema = Yup.object({
//         name: Yup.string().required("Name is Required"),
//         number: Yup.string()
//             .matches(/^\d{10}$/, "Phone Number must be 10 digits")
//             .required(),
//     });

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await validationSchema.validate(formData, { abortEarly: false });
//             console.log("Form Submitted", formData);
//         } catch (error) {
//             console.log(formData);
//             const newErrors = {};
//             error.inner.forEach((err) => {
//                 newErrors[err.path] = err.message;
//             });

//             setErrors(newErrors);
//         }
//     };

//     const handleRefresh = async (e) => {
//         e.preventDefault();
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     const handlePhoneChange = async (e) => {
//         setPhone(e.target.value)
//         const phoneNumber = parsePhoneNumberFromString(phone);
//         if (phoneNumber) {
//             setFormData({
//                 ...formData,
//                 code: phoneNumber.countryCallingCode,
//                 number: phoneNumber.nationalNumber,
//             });
//         }
//     };

//     const theme = formType === 'A' ? 'red' : 'blue';
//     const bgColor = theme === 'red' ? 'bg-[#fcf2f0]' : 'bg-[#f0f6fc]';
//     const buttonColor = theme === 'red' ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600';

//     return (
//         <div className={`min-h-screen flex justify-center items-center ${bgColor}`}>
//             <div className={`w-full max-w-md p-8 rounded-xl bg-white`}>
//                 <div className='flex justify-end'>
//                     <div className='bg-green-500 p-2 rounded-full text-white cursor-pointer' onClick={handleRefresh}>
//                         <IoIosRefresh />
//                     </div>
//                 </div>
//                 <h1 className={`text-2xl font-bold mb-6 text-center ${theme === 'red' ? 'text-red-700' : 'text-blue-700'}`}>
//                     Form {formType}
//                 </h1>
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     <div>
//                         <label className="block mb-2 font-medium">Name:</label>
//                         <input
//                             type="text"
//                             name="name"
//                             value={formData.name}
//                             onChange={handleChange}
//                             className="w-full p-2 border rounded-md"
//                             required
//                         />
//                         {errors.name && <div className="text-sm">{errors.name}</div>}
//                     </div>
//                     <PhoneInput
//                         country={'us'}
//                         value={phone}
//                         onChange={handlePhoneChange}
//                     />
//                     {errors.number && <div className="text-sm">{errors.number}</div>}
//                     <button type="submit" className={`w-full p-2 text-white rounded-md ${buttonColor}`}>
//                         Submit
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default FormPage;



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

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is Required"),
        // number: Yup.string()
        //     .matches(/^\d{10}$/, "Phone Number must be 10 digits")
        //     .required(),
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await validationSchema.validate(formData, { abortEarly: false });
            console.log(formData);
            await axios.post('/info/post', formData);
            console.log("Form Submitted")
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

    const theme = formType === 'A' ? 'red' : 'blue';
    const bgColor = theme === 'red' ? 'bg-[#fcf2f0]' : 'bg-[#f0f6fc]';
    const buttonColor = theme === 'red' ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600';

    return (
        <div className={`min-h-screen flex justify-center items-center ${bgColor}`}>
            <div className={`w-full max-w-md p-8 rounded-xl bg-white`}>
                <div className='flex justify-end'>
                    <div className='bg-green-500 p-2 rounded-full text-white cursor-pointer' onClick={handleRefresh}>
                        <IoIosRefresh />
                    </div>
                </div>
                <h1 className={`text-2xl font-bold mb-6 text-center ${theme === 'red' ? 'text-red-700' : 'text-blue-700'}`}>
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
                        {errors.name && <div className="text-sm">{errors.name}</div>}
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Phone Number:</label>
                        <PhoneInput
                            country={'us'}
                            onChange={handlePhoneChange}
                            inputProps={{
                                name: 'phone',
                                required: true,
                                autoFocus: true
                            }}
                        />
                        {errors.number && <div className="text-sm">{errors.number}</div>}
                    </div>
                    <button type="submit" className={`w-full p-2 text-white rounded-md ${buttonColor}`}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default FormPage;

