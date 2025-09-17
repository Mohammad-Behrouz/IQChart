import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import alertify from 'alertifyjs';
import { span } from 'framer-motion/client';

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
        const res = await fetch("https://localhost:7282/api/product/all");
        const data = await res.json();
        setProducts(data);



      } catch (err) {
        alertify.error("خطا در دریافت محصولات");
        console.error(err);
      }
    };

    fetchProducts()
  }, [])


  const addProduct = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.Name.value.trim();
    const count = form.Count.value.trim();
    const price = form.Price.value.trim();
    const description = form.Description.value.trim();
    const images = form.querySelector("#Images").files;

    // بررسی اعتبار داده‌ها
    if (!name || !count || !price || !description) {
      alertify.error("لطفاً همه فیلدها را پر کنید");
      return;
    }

    if (isNaN(count) || parseInt(count) < 0) {
      alertify.error("تعداد محصول باید عددی و مثبت باشد");
      return;
    }

    if (isNaN(price) || parseFloat(price) <= 0) {
      alertify.error("قیمت محصول باید عددی و بیشتر از صفر باشد");
      return;
    }

    if (!images || images.length === 0) {
      alertify.error("لطفاً حداقل یک عکس انتخاب کنید");
      return;
    }

    // ساخت FormData
    const formData = new FormData();
    formData.append("Name", name);
    formData.append("count", count);
    formData.append("price", price);
    formData.append("Description", description);

    for (let i = 0; i < images.length; i++) {
      formData.append("Images", images[i]);
    }

    try {
      const res = await fetch("https://localhost:7282/api/product", {
        method: "POST",
        body: formData,
      });

      const contentType = res.headers.get("content-type");
      const json = await res.json()
      if (res.ok) {
        // const json = await res.json();
        alertify.success("محصول با موفقیت افزوده شد");
        form.reset();
        console.log(json);

        setProducts(p => [...p, json])
        setIsOpen(false); // بستن مودال بعد از موفقیت
      } else {
        if (contentType && contentType.includes("application/json")) {
          const error = await res.json();
          console.log(`خطا: ${error.message || "خطای ناشناخته"}`);
          alertify.error("خطای ناشناخته رخ داده")
        } else {
          const errorText = await res.text();
          alertify.error("خطای سمت سرور رخ داده")
          console.log("خطای سرور: " + errorText.slice(0, 200)); // محدود برای تمیزی
        }
      }
    } catch (err) {
      alertify.error("اتصال به سرور برقرار نشد");
      console.error(err);
    }
  };

  const setDiscount = async (e) => {
    console.log(selecetdDiscountP.id);

    e.preventDefault();
    const res = await fetch("https://localhost:7282/api/product/setdiscount/" + selecetdDiscountP.id, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        discount: selecetdDiscountP.discount
      })
    })
    if (res.ok) {
      setProducts(prev =>
        prev.map(p =>
          p.id === selecetdDiscountP.id ? { ...p, discount: selecetdDiscountP.discount } : p
        )
      );
      alertify.success("تخفیف با موفقیت اعمال شد")
      setDiscountOpen(false)
    } else {
      alertify.error("خطا از سمت سرور")
    }
  }

  const EditProduct = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.Name.value.trim();
    const count = form.Count.value.trim();
    const price = form.Price.value.trim();
    const description = form.Description.value.trim();

    if (!name || !count || !price || !description) {
      alertify.error("لطفاً همه فیلدها را پر کنید");
      return;
    }

    if (isNaN(count) || parseInt(count) < 0) {
      alertify.error("تعداد محصول باید عددی و مثبت باشد");
      return;
    }

    if (isNaN(price) || parseFloat(price) <= 0) {
      alertify.error("قیمت محصول باید عددی و بیشتر از صفر باشد");
      return;
    }

    const formData = new FormData();
    formData.append("Name", name);
    formData.append("count", count);
    formData.append("price", price);
    formData.append("Description", description);

    try {
      const res = await fetch("https://localhost:7282/api/product/" + selecetdDiscountP.id, {
        method: "POST",
        body: formData
      })
      const json = await res.json()
      if (res.ok) {
        setProducts(prev =>
          prev.map(p =>
            p.id === selecetdDiscountP.id ? { ...p, name: name, count: count, description: description, price: price } : p
          )
        );
        alertify.success("ویرایش موفقیت آمیز بود")
        setEditingModal(false)

      } else {
        console.log(json);

        alertify.error("درخواست موفقیت آمیز نبود")
      }
    } catch (error) {
      console.log(error);
      alertify.error("خطای سمت سرور")

    }


  }


  const changeDiscount = (number) => {
    setSelecetdDiscountP(p => ({
      ...p,
      discount: parseInt(number)
    }));
  }

  const deleteProduct = async () => {
    const res = await fetch("https://localhost:7282/api/product/" + selecetdDiscountP.id, {
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
      <div className="header-of-products">
        <h2>📦محصولات سایت </h2>
        <button onClick={openModal} className='common-button'>افزودن محصول</button>
      </div>

      <section className='displaying-products custom-scroll'>
        <div id='displaying-products-div'>

          {products.map((p, index) => {
            return (
              <div key={index} className='admin-show-product'>
                <img src={`https://localhost:7282/${p.images[0]}`} alt="" />
                <h5>{p.name}</h5>
                <div className='count-p-div'>
                  {
                    p.discount == 0
                      ? <span>قیمت : <b>{p.price.toLocaleString("fa-IR")}</b></span>
                      : <span>
                        قیمت :
                        <s className='sm text-body-tertiary'>{p.price.toLocaleString("fa-IR")}</s>
                        &nbsp;
                        <b>{((p.price * (100 - p.discount)) / 100).toLocaleString("fa-IR")}</b>


                      </span>
                  }

                  <span>موجودی :<b>{p.count}</b></span>
                </div>

                <div className='edit-and-discount-btns ' style={{ width: "80%" }}>
                  <button className='btn btn-success btn-sm ' onClick={() => openEditingModal(p.id)}><i className="fa-solid fa-edit  "></i> ویرایش</button>
                  <button className=' btn btn-primary  btn-sm' onClick={() => openDiscountModal(p.id)}><i className='fa-solid fa-percent'></i> تخفیف</button>
                </div>
                <button className="btn-warning btn btn-danger btn-sm " id='delete-button-p' onClick={() => openDeletingModal(p.id)}><i className='fa-solid fa-trash'></i> حذف محصول از سایت</button>
              </div>
            )
          })}
        </div>
      </section>

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
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
        <div className='modal-product'>
          <h4 >افزودن محصول</h4>
          <form onSubmit={addProduct}>
            <div className='common-input-div'>
              <i className='fa-solid fa-box-open'></i>
              <input type="text" className='common-input' name='Name' placeholder='نام محصول' />
            </div>
            <div className='common-input-div'>
              <i className='fa-solid fa-boxes-stacked'></i>
              <input type="number" min={0} className='common-input' name='Count' placeholder='تعداد موجودی' />
            </div>
            <div className='common-input-div'>
              <i className='fa-solid fa-wallet'></i>
              <input type="text" className='common-input' name='Price' placeholder='قیمت محصول' />
            </div>
            <div className='common-input-div'>
              <i className='fa-solid fa-notes'></i>
              <textarea type="text" className='common-input' name='Description' placeholder='توضیحات محصول' />
            </div>
            <div className="mb-3 upload-img">
              <label for="formFile" className="form-label"> آپلود عکس برای محصول <i className='fa-solid fa-image'></i></label>
              <input className="form-control" name="Images" multiple accept="image/*" type="file" id="Images" />
            </div>
            <div id='product-add-buttons'>
              <button onClick={closeModal} className=' common-button common-red'>بستن</button>
              <button className=' common-button common-green'>افزودن</button>
            </div>
          </form>
        </div>
      </Modal>
      {/* مودال برای ست کردن تخفیف */}
      <Modal
        isOpen={discountOpen}
        onRequestClose={closeDiscountModal}
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
        <div className='modal-product'>
          <h4 >افزودن تخفیف به محصول 🔖</h4>
          <form onSubmit={(e) => setDiscount(e)} className='discount-form'>
            {discountOpen &&
              <>

                <input onChange={(e) => changeDiscount(e.target.value)} value={selecetdDiscountP.discount} type="range" name="discount" id="discount-slider" />

                <p>
                  {selecetdDiscountP.price.toLocaleString("fa-IR")} ➡️
                  {selecetdDiscountP.discount}% ➡️
                  {((selecetdDiscountP.price * (100 - selecetdDiscountP.discount)) / 100).toLocaleString("fa-IR")}
                </p>
              </>
            }

            <button type='submit' className='common-button'>  ثبت تخفیف </button>
          </form>
        </div>
      </Modal>
      {/* مودال برای ادیت کردن کالا */}
      <Modal
        isOpen={EditingModal}
        onRequestClose={closeEditingModal}
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
        <div className='modal-product'>
          <h4 >ویرایش محصول</h4>
          <form onSubmit={EditProduct}>
            {selecetdDiscountP &&
              <>

                <div className='common-input-div'>
                  <i className='fa-solid fa-box-open'></i>
                  <input
                    type="text"
                    className='common-input'
                    name='Name'
                    value={selecetdDiscountP.name}
                    placeholder='نام محصول'
                    onChange={(e) =>
                      setSelecetdDiscountP(prev => ({ ...prev, name: e.target.value }))
                    }
                  />
                </div>

                <div className='common-input-div'>
                  <i className='fa-solid fa-boxes-stacked'></i>
                  <input
                    type="number"
                    min={0}
                    className='common-input'
                    name='Count'
                    value={selecetdDiscountP.count}
                    placeholder='تعداد موجودی'
                    onChange={(e) =>
                      setSelecetdDiscountP(prev => ({ ...prev, count: e.target.value }))
                    }
                  />
                </div>

                <div className='common-input-div'>
                  <i className='fa-solid fa-wallet'></i>
                  <input
                    type="text"
                    className='common-input'
                    name='Price'
                    value={selecetdDiscountP.price}
                    placeholder='قیمت محصول'
                    onChange={(e) =>
                      setSelecetdDiscountP(prev => ({ ...prev, price: e.target.value }))
                    }
                  />
                </div>

                <div className='common-input-div'>
                  <i className='fa-solid fa-notes'></i>
                  <textarea
                    className='common-input'
                    name='Description'
                    value={selecetdDiscountP.description}
                    placeholder='توضیحات محصول'
                    onChange={(e) =>
                      setSelecetdDiscountP(prev => ({ ...prev, description: e.target.value }))
                    }
                  />
                </div>

                <div id='product-add-buttons'>
                  <button
                    onClick={closeEditingModal}
                    className='center btn btn-danger'
                    style={{ gap: "5px" }}
                  >
                    بستن <i className='fa-solid fa-circle-xmark'></i>
                  </button>
                  <button
                    className='center btn btn-success'
                    style={{ gap: "5px" }}
                    type='submit'
                  >
                    ویرایش <i className='fa-solid fa-edit'></i>
                  </button>
                </div>
              </>
            }
          </form>

        </div>
      </Modal>
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