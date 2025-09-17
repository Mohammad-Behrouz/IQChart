import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import '@tinymce/tinymce-react';
import Nav from '../Components/Nav';
import Header from '../Components/Header';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import back_address from '../javaScript/backend';
import { Link } from 'react-router-dom';

export default function App() {
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [author, setAuthor] = useState('');
    const [summary, setSummary] = useState('');
    const [cover, setCover] = useState(null);
    const [content, setContent] = useState('');

    const submitArticle = async () => {
        console.log(content);
        if (!title || !slug || !author || !cover || !summary || !content) {
            alertify.error('لطفا تمام فیلدها را پر کنید.');
            return;
        }



        const formData = new FormData();
        formData.append('Title', title);
        formData.append('Slug', slug);
        formData.append('Author', author); // حتی اگه تو DTO نیست، شاید سرور قبول کنه
        formData.append('Summary', summary);
        formData.append('ContentJson', content);
        formData.append('CoverImageUrl', cover);

        try {
            const res = await fetch(back_address() + 'api/Article', {
                method: 'POST',
                body: formData,
            });

            if (res.ok) {
                alertify.success('مقاله با موفقیت ثبت شد!');
                // پاک کردن فرم
                setTitle('');
                setSlug('');
                setAuthor('');
                setSummary('');
                setCover(null);
                setContent('');
                document.getElementById('Images').value = '';
            } else {
                alertify.error('خطا در ارسال مقاله.');
            }
        } catch (error) {
            alertify.error('مشکلی در ارتباط با سرور پیش آمده.');
            console.error(error);
        }
    };

    return (
        <>
            <Nav />
            <div id='header-of-adding-article'>
                <h3> افزودن مقاله به سایت 📰 </h3>
                <div className='flex'>
                    <Link className="btn btn-danger text-white m-1 shadow" to="/admin/articles">بازگشت</Link>
                    <button onClick={submitArticle} className='common-button'>افزودن مقاله</button>
                </div>
            </div>
            <div id='info-container'>
                <div className='article-info'>
                    <div className='common-input'>
                        <i className="fa-solid fa-heading"></i>
                        <input
                            type="text"
                            placeholder='موضوع مقاله'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className='common-input'>
                        <i className="fa-solid fa-signature"></i>
                        <input
                            type="text"
                            placeholder='نمایانگر مقاله (slug)'
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                        />
                    </div>
                    <div className='common-input'>
                        <i className="fa-solid fa-user-tie"></i>
                        <input
                            type="text"
                            placeholder='نویسنده مقاله'
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </div>
                </div>

                <div id='uplpad-container'>
                    <div className="mb-3 upload-for-article upload-img">
                        <label id='label-of-article' htmlFor="formFile" className="form-label">
                            <i className='fa-solid fa-image'></i> آپلود کاور برای مقاله
                        </label>
                        <input
                            className="form-control"
                            name="Images"
                            accept="image/*"
                            type="file"
                            id="Images"
                            onChange={(e) => setCover(e.target.files[0])}
                        />
                    </div>
                </div>

                <div id='uplpad-container'>
                    <div className="mb-3 upload-for-article upload-img">
                        <label id='label-of-article' className="form-label">
                            <i className='fa-solid fa-clipboard-list'></i> خلاصه مقاله برای مقدمه
                        </label>
                        <textarea
                            className="form-control"
                            placeholder='خلاصه ....'
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                        />
                    </div>
                </div>

                <Editor
                    apiKey='tgy3b4y0s7eos8qelllfgbe2ciy3sqk44pyuic3wtbgv0yzr'
                    onEditorChange={(newValue) => setContent(newValue)}
                    value={content}
                    init={{
                        spellcheck: false,
                        directionality: "rtl",
                        language: "fa",
                        plugins: [
                            'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media',
                            'searchreplace', 'table', 'visualblocks', 'wordcount', 'checklist', 'mediaembed', 'casechange',
                            'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste',
                            'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments',
                            'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss',
                            'markdown', 'importword', 'exportword', 'exportpdf'
                        ],
                        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                        tinycomments_mode: 'embedded',
                        tinycomments_author: 'Author name',
                        mergetags_list: [
                            { value: 'First.Name', title: 'First Name' },
                            { value: 'Email', title: 'Email' },
                        ],
                        ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
                    }}
                />
            </div>
        </>
    );
}
