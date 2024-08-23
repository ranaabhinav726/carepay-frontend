import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Loadinggif from '../../../utils/loader/Loading 3.gif';

const PayUCheckoutComponent = () => {
    const [loaderState, setLoaderState] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoaderState(false);
        }, 1000);

        return () => {
        };
    }, []);

    return (
        <main className='congrats'>
            <Header progressbarDisplay="none" />

            {loaderState ? <img src={Loadinggif} alt="Loading" /> : ""}
            {loaderState
                ? <p className='text-center'>Connecting with your bank...</p>
                : <p className='text-center' style={{ marginTop: '150px' }}>You will be shown a popup to proceed with your payment. Press continue to start.</p>
            }

            {!loaderState && (
                <form
                    action="https://test.payu.in/_payment"
                    method="POST"
                    target="_blank" 
                >
                    <input type="hidden" name="key" value="JPM7Fg" />
                    <input type="hidden" name="surl" value="https://test-payment-middleware.payu.in/simulatorResponse" />
                    <input type="hidden" name="furl" value="https://test-payment-middleware.payu.in/simulatorResponse" />
                    <input type="hidden" name="pg" value="EMI" />
                    <input type="hidden" name="txnid" value="1234566" />
                    <input type="hidden" name="amount" value="1234" />
                    <input type="hidden" name="productinfo" value="iPhone" />
                    <input type="hidden" name="firstname" value="prachi" />
                    <input type="hidden" name="email" value="prachibindal2925@gmail.com" />
                    <input type="hidden" name="bankcode" value="EMIAMEX12" />
                    <input type="hidden" name="ccnum" value="1234" />
                    <input type="hidden" name="ccvv" value="123" />
                    <input type="hidden" name="ccname" value="12" />
                    <input type="hidden" name="ccexpmon" value="05" />
                    <input type="hidden" name="ccexpyr" value="2023" />
                    <input type="hidden" name="hash" value="3cb56876a882b88f2d7d6b3264977b00b829378f53e655873946faada995617f1922d2735799f5217504450e77025c76bcebb5fca6a4297718fb6be18ae130bc" />

                    <button
                        type="submit"
                        style={{
                            marginTop: '20px',
                            padding: '15px',
                            color: '#504c9a',
                            background: '#ecebfd',
                            border: 'none',
                            borderRadius: '5px',
                            fontSize: '14px',
                            fontWeight: '700'
                        }}
                    >
                        Continue
                    </button>
                </form>
            )}

            <p style={{ textAlign: 'center', fontSize: '14px', marginTop: '10px', marginBottom: '10px', marginTop: '120px' }}>
                Need help? Reach out to us.
            </p>
            <a
                style={{ color: '#000', textDecoration: 'none', width: '100%' }}
                href={"tel:+91 806 948 9655"}
            >
                <button
                    className="submit"
                    style={{ background: '#ECEBFF', color: "#514C9F", marginTop: '-6px' }}
                >
                    Contact Support
                </button>
            </a>
        </main>
    );
};

export default PayUCheckoutComponent;
