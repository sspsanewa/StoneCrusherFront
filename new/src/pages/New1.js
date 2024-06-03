import React, { useEffect } from 'react';
import i18next from 'i18next';

const New1 = () => {
    useEffect(() => {
        const initI18n = async () => {
            await i18next.init({
                lng: 'hi', // if you're using a language detector, do not define the lng option
                debug: true,
                resources: {
                    en: {
                        translation: {
                            "key": "hello world"
                        }
                    }
                }
            });

            // initialized and ready to go!
            document.getElementById('output').innerHTML = i18next.t('key');
        };

        initI18n();
    }, []); // Empty dependency array to run this effect only once

    return (
        <div id="output"></div>
    );
};

export default New1;
