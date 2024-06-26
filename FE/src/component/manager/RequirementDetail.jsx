import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';

function RequirementDetail() {
   return (
      <>
         <div className="py-[3rem] px-[3rem] min-h-[100vh] bg-[#f7f9fc]">
            <div className="grid grid-cols-3 gap-x-[1.5rem]">
               {/* Ben trai */}
               <div className="col-span-2 ">
                  <div className="py-[2.5rem] px-[2.5rem] rounded-[30px] border-[1px] border-[#e9eaf3] border-solid bg-[white]" >

                     <div>
                        <h2 className="text-[32px] font-bold ">Order #1</h2>
                        <Chip label="Đang đợi báo giá" color='warning' variant="outlined" sx={{ fontWeight: 700 }} />
                     </div>

                     <div className="h-[1.5px] bg-[#e9eaf3] my-[1.5rem]"></div>

                     <div>
                        <h2 className="text-[22px] mb-[1rem] font-bold leading-[1.273em]">Tên của bản thiết kế</h2>
                        <div className="flex ">
                           <img className="w-[15rem] h-[15rem]" src="https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/item1.jpg?alt=media&token=aa586840-29a7-46c3-ab75-6db6302bb1ca" />
                           <p className="ml-[1rem] text-[#6f7182]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur qui enim facilis maiores, voluptatem amet eaque dolores odit asperiores exercitationem minus itaque id dolorem minima eum assumenda. Dolores, veritatis animi.</p>
                        </div>
                     </div>

                     <div className="h-[1.5px] bg-[#e9eaf3] my-[1.5rem]"></div>

                     <div>
                        <h2 className="text-[32px] mb-[1rem] font-bold leading-[1.273em]">Customer Requirement</h2>

                        {/* Bang thong tin tong the */}
                        <h2 className="text-[20px] mb-[1rem] font-bold leading-[1.273em]">General Information</h2>
                        <table className='table-fixed w-[100%] font-medium overflow-hidden border-collapse border-[1px] border-solid border-[#000]'>
                           <thead className='bg-[#eccc68] border-[1px] border-solid border-[#000]'>
                              <tr>
                                 <th className='px-[1rem] py-[0.5rem] text-left border-[1px] border-solid border-[#000]'>Jewelry Type</th>
                                 <th className='px-[1rem] py-[0.5rem] text-left border-[1px] border-solid border-[#000]'>Jewelry Size</th>
                                 <th className='px-[1rem] py-[0.5rem] text-left border-[1px] border-solid border-[#000]'>Jewelry Material</th>
                              </tr>
                           </thead>
                           <tbody>
                              <tr>
                                 <td className='px-[1rem] py-[1rem] border-[1px] border-solid border-[#000]'>Ring</td>
                                 <td className='px-[1rem] py-[1rem] border-[1px] border-solid border-[#000]'>20</td>
                                 <td className='px-[1rem] py-[1rem] border-[1px] border-solid border-[#000]'>Gold</td>
                              </tr>
                           </tbody>
                        </table>

                        <div className='my-[1rem]'></div>

                        {/* Bang thong tin cho hat chu */}
                        <h2 className="text-[20px] mb-[1rem] font-bold leading-[1.273em]">Master Gemstone</h2>
                        <table className='table-fixed w-[100%] font-medium overflow-hidden border-collapse border-[1px] border-solid border-[#000]'>
                           <thead className='bg-[#eccc68] border-[1px] border-solid border-[#000]'>
                              <tr>
                                 <th className='px-[1rem] py-[0.5rem] text-left border-[1px] border-solid border-[#000]'>Kind</th>
                                 <th className='px-[1rem] py-[0.5rem] text-left border-[1px] border-solid border-[#000]'>Size</th>
                                 <th className='px-[1rem] py-[0.5rem] text-left border-[1px] border-solid border-[#000]'>Weight</th>
                                 <th className='px-[1rem] py-[0.5rem] text-left border-[1px] border-solid border-[#000]'>Shape</th>
                              </tr>
                           </thead>
                           <tbody>
                              <tr>
                                 <td className='px-[1rem] py-[1rem] border-[1px] border-solid border-[#000]'>Ruby</td>
                                 <td className='px-[1rem] py-[1rem] border-[1px] border-solid border-[#000]'>1.5</td>
                                 <td className='px-[1rem] py-[1rem] border-[1px] border-solid border-[#000]'>100</td>
                                 <td className='px-[1rem] py-[1rem] border-[1px] border-solid border-[#000]'>Square</td>
                              </tr>
                           </tbody>
                        </table>

                        <div className='my-[1rem]'></div>

                        {/* Bang thong tin cho hat tam */}
                        <h2 className="text-[20px] mb-[1rem] font-bold leading-[1.273em]">Stones</h2>
                        <table className='table-fixed w-[100%] font-medium overflow-hidden border-collapse border-[1px] border-solid border-[#000]'>
                           <thead className='bg-[#eccc68] border-[1px] border-solid border-[#000]'>
                              <tr>
                                 <th className='px-[1rem] py-[0.5rem] text-left border-[1px] border-solid border-[#000]'>Kind</th>
                                 <th className='px-[1rem] py-[0.5rem] text-left border-[1px] border-solid border-[#000]'>Size</th>
                                 <th className='px-[1rem] py-[0.5rem] text-left border-[1px] border-solid border-[#000]'>Quantity</th>
                              </tr>
                           </thead>
                           <tbody>
                              <tr>
                                 <td className='px-[1rem] py-[1rem] border-[1px] border-solid border-[#000]'>CZ</td>
                                 <td className='px-[1rem] py-[1rem] border-[1px] border-solid border-[#000]'>0.3</td>
                                 <td className='px-[1rem] py-[1rem] border-[1px] border-solid border-[#000]'>20</td>
                              </tr>
                           </tbody>
                        </table>

                     </div>

                  </div>

                  {/* Note cua customer */}
                  <div className=' my-[1.5rem] py-[2.5rem] px-[2.5rem] rounded-[30px] border-[1px] border-[#e9eaf3] border-solid bg-[white]'>
                     <h2 className='text-[22px] mb-[1rem] font-bold leading-[1.273em]'>Customer Note</h2>
                     <p className='text-[#6f7182]'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus laborum reprehenderit corrupti voluptatum exercitationem, cupiditate in assumenda reiciendis, hic quos pariatur vel, harum impedit deserunt nostrum nulla architecto magni odit!
                        Minus sunt dolorem incidunt harum ut odit optio, animi totam tempora eius, sint mollitia debitis doloremque fugiat ducimus deleniti. Et nemo deleniti ea! Cum rerum eaque neque eligendi minima alias?
                     </p>
                  </div>

                  {/* Note cua sell staff */}
                  <div className='py-[2.5rem] px-[2.5rem] rounded-[30px] border-[1px] border-[#e9eaf3] border-solid bg-[white]'>
                     <h2 className='text-[22px] mb-[1rem] font-bold leading-[1.273em]'>Sell Staff Note</h2>
                     <p className='text-[#6f7182]'>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit id velit magnam provident consectetur vel dolore doloremque maiores fugiat tempora eaque vitae, dolor, mollitia modi ab cum a! Tenetur, ducimus.
                     </p>
                  </div>
               </div>

               {/* Ben phai */}
               <div className='max-h-[380px] sticky top-[24px]  py-[2.5rem] px-[2rem] rounded-[30px] border-[1px] border-[#e9eaf3] border-solid bg-[white]'>
                  <h2 className='text-[22px] mb-[1rem] font-bold leading-[1.273em]'>Price Quotation</h2>

                  <div className="h-[1.5px] bg-[#e9eaf3] my-[1.5rem]"></div>

                  {/* Form dien khoi luong va tien cong */}
                  <div>
                     <h2 className='text-[1rem] font-medium pb-[3px]'>Material Weight (g)</h2>
                     <div>
                        <TextField variant="outlined" style={{ width: '100%' }} size='small' />
                     </div>

                     <h2 className='mt-[1rem] text-[1rem] font-medium pb-[3px]'>Machining Fee  (VND)</h2>
                     <div>
                        <TextField variant="outlined" style={{ width: '100%' }} size='small' />
                     </div>

                     <div className='my-[1rem]'></div>
                  </div>

                  <div className='mt-[1rem]'>
                     <Button variant="contained" sx={{ minWidth: '6rem' }}>
                        Add
                     </Button>
                  </div>

               </div>

            </div>
         </div>
      </>
   )
}

export default RequirementDetail;