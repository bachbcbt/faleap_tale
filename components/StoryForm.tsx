
import React, { useState } from 'react';
import { UserData } from '../types';
import { SparklesIcon } from './icons';

interface StoryFormProps {
    onSubmit: (data: UserData) => void;
    isLoading: boolean;
}

export const StoryForm: React.FC<StoryFormProps> = ({ onSubmit, isLoading }) => {
    const [formData, setFormData] = useState<UserData>({
        name: '',
        school: '',
        year: 'một',
        interest: '',
        dream: '',
        strength: '',
        weakness: '',
        gender: 'female',
    });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({...prev, gender: e.target.value as 'male' | 'female'}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        for (const key in formData) {
            if (formData[key as keyof UserData] === '') {
                setError('Vui lòng điền đầy đủ tất cả các trường thông tin.');
                return;
            }
        }
        setError('');
        onSubmit(formData);
    };

    const inputClass = "w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out";
    const labelClass = "block text-sm font-medium text-gray-700";

    return (
        <div className="w-full max-w-2xl p-8 space-y-8 bg-white rounded-2xl shadow-lg">
            <div>
                <h1 className="text-3xl font-bold text-center text-gray-800">Tạo Hành Trình FaLeap Của Bạn</h1>
                <p className="mt-2 text-center text-gray-600">Hãy chia sẻ một chút về bản thân để chúng tôi dệt nên câu chuyện độc đáo cho riêng bạn.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="name" className={labelClass}>Tên của bạn</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="VD: An Nguyễn" className={inputClass} />
                    </div>
                    <div>
                        <label htmlFor="school" className={labelClass}>Trường học</label>
                        <input type="text" id="school" name="school" value={formData.school} onChange={handleChange} placeholder="VD: Đại học Quốc gia" className={inputClass} />
                    </div>
                     <div>
                        <label htmlFor="year" className={labelClass}>Sinh viên năm mấy?</label>
                        <select id="year" name="year" value={formData.year} onChange={handleChange} className={inputClass}>
                            <option value="năm một">Năm một</option>
                            <option value="năm hai">Năm hai</option>
                            <option value="năm ba">Năm ba</option>
                            <option value="năm tư">Năm tư</option>
                            <option value="năm cuối">Năm cuối</option>
                            <option value="tốt nghiệp">Đã tốt nghiệp</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="interest" className={labelClass}>Lĩnh vực quan tâm</label>
                        <input type="text" id="interest" name="interest" value={formData.interest} onChange={handleChange} placeholder="VD: bảo vệ môi trường, giáo dục" className={inputClass} />
                    </div>
                     <div className="md:col-span-2">
                        <label htmlFor="dream" className={labelClass}>Ước mơ của bạn là gì?</label>
                        <input type="text" id="dream" name="dream" value={formData.dream} onChange={handleChange} placeholder="VD: xây dựng một tương lai xanh" className={inputClass} />
                    </div>
                    <div>
                        <label htmlFor="strength" className={labelClass}>Điểm mạnh của bạn</label>
                        <input type="text" id="strength" name="strength" value={formData.strength} onChange={handleChange} placeholder="VD: sáng tạo, làm việc nhóm" className={inputClass} />
                    </div>
                    <div>
                        <label htmlFor="weakness" className={labelClass}>Điểm yếu cần cải thiện</label>
                        <input type="text" id="weakness" name="weakness" value={formData.weakness} onChange={handleChange} placeholder="VD: kỹ năng thuyết trình" className={inputClass} />
                    </div>
                </div>
                
                <div>
                  <label className={labelClass}>Chọn nhân vật</label>
                  <div className="mt-2 flex items-center space-x-4">
                    <label className="flex items-center p-2 border border-gray-300 rounded-lg has-[:checked]:bg-blue-50 has-[:checked]:border-blue-500 cursor-pointer">
                      <input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleGenderChange} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                      <span className="ml-3 text-gray-700">Nữ</span>
                    </label>
                    <label className="flex items-center p-2 border border-gray-300 rounded-lg has-[:checked]:bg-blue-50 has-[:checked]:border-blue-500 cursor-pointer">
                      <input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleGenderChange} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                      <span className="ml-3 text-gray-700">Nam</span>
                    </label>
                  </div>
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <div>
                    <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center gap-2 px-4 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 transition-all duration-300">
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Đang tạo câu chuyện...
                            </>
                        ) : (
                            <>
                                <SparklesIcon className="w-5 h-5" />
                                Viết nên câu chuyện của tôi
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};
