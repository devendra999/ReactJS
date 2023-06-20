import React, { useEffect } from 'react'
import './showcontent.scss'

const Showcontent = () => {

    useEffect(() => {

        let content = document.querySelectorAll('.content');
      
        for(let i = 0; i < content.length; i++) {
            
            window.addEventListener('scroll', () => {
                if (window.scrollY + window.innerHeight > content[i].offsetTop + 20) {
                    content[i].classList.add('show');
                } else {
                    content[i].classList.remove('show');
                }

            });
        }
    }, [])
    
  return (
    <>
        <div className="show-section">
            <div className="container">
                <div style={{ height: '100vh' }}></div>
                <div className="content">
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor ipsa voluptatem vitae, velit omnis aut aliquid quisquam magnam? Asperiores consequuntur cupiditate sint quae incidunt sed, aliquid nam, nostrum voluptas, eos illum quaerat ullam? Reiciendis commodi aliquid ullam sequi dignissimos facere ratione accusamus deleniti, delectus vel debitis voluptate reprehenderit ipsum quo. Molestiae ipsam adipisci temporibus dolorem corrupti, nemo et, consectetur ea alias sit consequuntur. Cupiditate error possimus accusantium aut orem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam soluta, error quibusdam placeat distinctio obcaecati nulla vero expedita explicabo, aspernatur perferendis molestiae facere debitis harum in eius, omnis dignissimos porro. Quo assumenda quod ab?</p>
                </div>
                <div className="content">
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor ipsa voluptatem vitae, velit omnis aut aliquid quisquam magnam? Asperiores consequuntur cupiditate sint quae incidunt sed, aliquid nam, nostrum voluptas, eos illum quaerat ullam? Reiciendis commodi aliquid ullam sequi dignissimos facere ratione accusamus deleniti, delectus vel debitis voluptate reprehenderit ipsum quo. Molestiae ipsam adipisci temporibus dolorem corrupti, nemo et, consectetur ea alias sit consequuntur. Cupiditate error possimus accusantium aut orem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam soluta, error quibusdam placeat distinctio obcaecati nulla vero expedita explicabo, aspernatur perferendis molestiae facere debitis harum in eius, omnis dignissimos porro. Quo assumenda quod ab?</p>
                </div>
                <div className="content">
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor ipsa voluptatem vitae, velit omnis aut aliquid quisquam magnam? Asperiores consequuntur cupiditate sint quae incidunt sed, aliquid nam, nostrum voluptas, eos illum quaerat ullam? Reiciendis commodi aliquid ullam sequi dignissimos facere ratione accusamus deleniti, delectus vel debitis voluptate reprehenderit ipsum quo. Molestiae ipsam adipisci temporibus dolorem corrupti, nemo et, consectetur ea alias sit consequuntur. Cupiditate error possimus accusantium aut orem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam soluta, error quibusdam placeat distinctio obcaecati nulla vero expedita explicabo, aspernatur perferendis molestiae facere debitis harum in eius, omnis dignissimos porro. Quo assumenda quod ab?</p>
                </div>
                <div className="content">
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor ipsa voluptatem vitae, velit omnis aut aliquid quisquam magnam? Asperiores consequuntur cupiditate sint quae incidunt sed, aliquid nam, nostrum voluptas, eos illum quaerat ullam? Reiciendis commodi aliquid ullam sequi dignissimos facere ratione accusamus deleniti, delectus vel debitis voluptate reprehenderit ipsum quo. Molestiae ipsam adipisci temporibus dolorem corrupti, nemo et, consectetur ea alias sit consequuntur. Cupiditate error possimus accusantium aut orem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam soluta, error quibusdam placeat distinctio obcaecati nulla vero expedita explicabo, aspernatur perferendis molestiae facere debitis harum in eius, omnis dignissimos porro. Quo assumenda quod ab?</p>
                </div>
                <div className="content">
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor ipsa voluptatem vitae, velit omnis aut aliquid quisquam magnam? Asperiores consequuntur cupiditate sint quae incidunt sed, aliquid nam, nostrum voluptas, eos illum quaerat ullam? Reiciendis commodi aliquid ullam sequi dignissimos facere ratione accusamus deleniti, delectus vel debitis voluptate reprehenderit ipsum quo. Molestiae ipsam adipisci temporibus dolorem corrupti, nemo et, consectetur ea alias sit consequuntur. Cupiditate error possimus accusantium aut orem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam soluta, error quibusdam placeat distinctio obcaecati nulla vero expedita explicabo, aspernatur perferendis molestiae facere debitis harum in eius, omnis dignissimos porro. Quo assumenda quod ab?</p>
                </div>
                <div className="content">
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor ipsa voluptatem vitae, velit omnis aut aliquid quisquam magnam? Asperiores consequuntur cupiditate sint quae incidunt sed, aliquid nam, nostrum voluptas, eos illum quaerat ullam? Reiciendis commodi aliquid ullam sequi dignissimos facere ratione accusamus deleniti, delectus vel debitis voluptate reprehenderit ipsum quo. Molestiae ipsam adipisci temporibus dolorem corrupti, nemo et, consectetur ea alias sit consequuntur. Cupiditate error possimus accusantium aut orem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam soluta, error quibusdam placeat distinctio obcaecati nulla vero expedita explicabo, aspernatur perferendis molestiae facere debitis harum in eius, omnis dignissimos porro. Quo assumenda quod ab?</p>
                </div>
                <div className="content">
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor ipsa voluptatem vitae, velit omnis aut aliquid quisquam magnam? Asperiores consequuntur cupiditate sint quae incidunt sed, aliquid nam, nostrum voluptas, eos illum quaerat ullam? Reiciendis commodi aliquid ullam sequi dignissimos facere ratione accusamus deleniti, delectus vel debitis voluptate reprehenderit ipsum quo. Molestiae ipsam adipisci temporibus dolorem corrupti, nemo et, consectetur ea alias sit consequuntur. Cupiditate error possimus accusantium aut orem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam soluta, error quibusdam placeat distinctio obcaecati nulla vero expedita explicabo, aspernatur perferendis molestiae facere debitis harum in eius, omnis dignissimos porro. Quo assumenda quod ab?</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default Showcontent