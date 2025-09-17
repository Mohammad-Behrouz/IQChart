import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import alertify from 'alertifyjs';
import { span } from 'framer-motion/client';
import Header from "../../Components/Header"
import { Link } from 'react-router-dom';
import back_address from '../../javaScript/backend';

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [discountOpen, setDiscountOpen] = useState(false);
  const [selecetdDiscountP, setSelecetdDiscountP] = useState()
  const [EditingModal, setEditingModal] = useState(false)
  const [deletingP, setDeletingP] = useState(false)

  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://localhost:7282/api/article/all");
        const data = await res.json();
        console.log(data);
        
        setProducts(data);



      } catch (err) {
        alertify.error("خطا در دریافت محصولات");
        console.error(err);
      }
    };

    fetchProducts()
  }, [])



  const deleteProduct = async () => {
    const res = await fetch("https://localhost:7282/api/article/" + selecetdDiscountP.id, {
      method: "DELETE"
    })
    const json = await res.json();

    if (res.ok) {
      alertify.success("محصول حذف شد")
      setProducts(prev => {
        return prev.filter(p => p.id != selecetdDiscountP.id)
      })
      setDeletingP(false)
    } else {
      alertify("مشکلی پیش آمده")
    }
  }




  /// باز و بسته کردن مودال ها
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const openDiscountModal = (id) => {

    for (let i = 0; i < products.length; i++) {
      if (products[i].id == id) {
        setSelecetdDiscountP(products[i])
      }
    }

    setDiscountOpen(true);
  }
  const closeDiscountModal = () => setDiscountOpen(false);
  const openEditingModal = async (id) => {
    const res = await fetch("https://localhost:7282/api/product/" + id);
    const json = await res.json();
    setSelecetdDiscountP(json);
    setEditingModal(true)
  }
  const closeEditingModal = () => {
    setEditingModal(false)
  }
  const openDeletingModal = (id) => {

    for (let i = 0; i < products.length; i++) {
      if (products[i].id == id) {
        setSelecetdDiscountP(products[i])
      }
    }
    setDeletingP(true)
  }
  const closeDeletingModal = () => {
    setDeletingP(false)
  }
  return (
    <>
      <div id='header-of-articles'>
        <Link to="/admin/articles/add" className='common-button' style={{ color: "white !important" }}>افزودن مقاله</Link>
        <Header title="مقاله های سایت📰" />
      </div>

      <section className='displaying-products custom-scroll'>
        <div id='displaying-article-div'>

          {products.map((p, index) => {
            return (
              <div key={index} className='admin-show-article'>
                <img src={`https://localhost:7282/${p.coverImageUrl}`} alt="" />
                <h4>{p.title}</h4>
                <p>{p.summary.slice(0, 65)}....</p>
                <div>
                  <Link className='btn common-button btn-primary btn-sm text-white ' id='delete-button-p' to={`https://localhost:3000/blog/${p.slug}`}><i className='fa-solid fa-eye'></i> مشاهده </Link>
                  <button className="btn btn-danger shadow btn-sm " id='delete-button-p' onClick={() => openDeletingModal(p.id)}><i className='fa-solid fa-trash'></i> حذف </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>



      {/* مودال برای حذف محصول */}
      <Modal
        isOpen={deletingP}
        onRequestClose={closeDeletingModal}
        contentLabel="مثال مودال"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '16px',
            padding: '2rem',
            width: '400px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            textAlign: "right"
          },
        }}
      >
        <div className='delete-modal'>
          <h4 >آیا از حذف محصول اطمینان دارید ؟ 🗑️</h4>
          <img src="/Images/admin/delete.png " alt="" />
          <button onClick={deleteProduct} className='common-button'>  حذف محصول </button>
        </div>
      </Modal>
    </>
  )
}


export default Page