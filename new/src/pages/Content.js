import { Alert, Box, Button, Grid, Paper, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import React, { useEffect, useState, useRef, useMemo } from 'react'
import Card from '../components/Card'
import { useNavigate } from 'react-router-dom';
import GroupsIcon from '@mui/icons-material/Groups';
import AddPhotoAlternate from '@mui/icons-material/AddPhotoAlternate';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import Constant from '../Config/Color';
import Popup from '../components/Popup';
import { Helmet } from 'react-helmet';
import { convertToHTML } from 'draft-convert';
import Url from '../Config/Url';
import axios from 'axios';
import Console from '../debug_log';
import { APP_PREFIX_PATH } from '../Config/AppConfig';
import JoditEditor from 'jodit-react';
import New from './New';
import Language from '../Config/Language'

const options = ['bold', 'italic', '|', 'ul', 'ol', '|', 'font', 'fontsize', '|', 'outdent', 'indent', 'align', '|', 'hr', '|', 'fullsize', 'brush', '|', 'table', 'link', '|', 'undo', 'redo',];


const mess = "These color palettes, originally created by Material Design in 2014, are comprised of colors designed to work together harmoniously, and can be used to develop your brand palette. To generate your own harmonious palettes, use the palette generation tool."
const Content = () => {
    const [content, setContent] = useState([])

    const [about, setAbout] = useState('')
    const [terms, setTerms] = useState('')
    const [privacy, setPrivacy] = useState('')
    const [message, setMessage] = useState()
    const [android, setAndroid] = useState('')
    const [ios, setIos] = useState('')
    const [alignment, setAlignment] = useState('About us');
    const [render, setRender] = useState(false)

    const [clickedButton, setClickedButton] = React.useState('About us');

    const handleClick = (event, newAlignment) => {
        setMsg('')
        setAlignment(newAlignment);
        setClickedButton(newAlignment);
    };

    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const [editorState1, setEditorState1] = useState('');
    const [editorState2, setEditorState2] = useState(EditorState.createEmpty());
    const [editorState3, setEditorState3] = useState(EditorState.createEmpty());
    const [msg, setMsg] = useState('')

    const editorRef = useRef(null);
    // const [value, setValue] = useState('');
    const config1 = useMemo(
        () => ({
            readonly: false,
            placeholder: '',
            defaultActionOnPaste: 'insert_as_html',
            defaultLineHeight: 1.2,
            enter: 'div',
            // options that we defined in above step.
            buttons: options,
            buttonsMD: options,
            buttonsSM: options,
            buttonsXS: options,
            statusbar: false,
            sizeLG: 900,
            sizeMD: 700,
            sizeSM: 400,
            toolbarAdaptive: false,
        }),
        [],
    );

    const config2 = useMemo(
        () => ({
            readonly: false,
            placeholder: '',
            defaultActionOnPaste: 'insert_as_html',
            defaultLineHeight: 1.2,
            enter: 'div',
            // options that we defined in above step.
            buttons: options,
            buttonsMD: options,
            buttonsSM: options,
            buttonsXS: options,
            statusbar: false,
            sizeLG: 900,
            sizeMD: 700,
            sizeSM: 400,
            toolbarAdaptive: false,
        }),
        [],
    );

    const config3 = useMemo(
        () => ({
            readonly: false,
            placeholder: '',
            defaultActionOnPaste: 'insert_as_html',
            defaultLineHeight: 1.2,
            enter: 'div',
            // options that we defined in above step.
            buttons: options,
            buttonsMD: options,
            buttonsSM: options,
            buttonsXS: options,
            statusbar: false,
            sizeLG: 900,
            sizeMD: 700,
            sizeSM: 400,
            toolbarAdaptive: false,
        }),
        [],
    );


    React.useEffect(() => {
        const params = { action: 'get_all_content' };
        Console("users")

        axios.get(`${Url}/common_controller/contents`, { params })
            .then(obj => {
                const res = obj.data.data.content_arr;

                Console("content res", res)
                // setAbout(res[0].content)
                setAbout(res[0].content)
                setTerms(res[1].content)
                setPrivacy(res[2].content)

                // setEditorState1(EditorState.createWithContent(ContentState.createFromText(res[0].content)));
                // // setAbout(editorState1)
                // setEditorState2(EditorState.createWithContent(ContentState.createFromText(res[1].content)))
                // // setTerms(editorState2)
                // setEditorState3(EditorState.createWithContent(ContentState.createFromText(res[2].content)))
                // // setPrivacy(editorState3)
                setMessage(res[3].content)
                setAndroid(res[4].content)
                setIos(res[5].content)
            })
            .catch(err => console.error("Error fetching users:", err));
        // .then(err => console.log("eoeee", err))
    }, [render])



    const handleUpdate = () => {


        console.log("about content on change", about)
        // const editorContent2 = () => {
        //     const contentState = editorState2.getCurrentContent();
        //     const rawContentState = convertToRaw(contentState);
        //     const text = rawContentState.blocks.map(block => block.text).join('\n');
        //     return text;
        // }
        // setTerms(editorContent2())

        // const editorContent3 = () => {
        //     const contentState = editorState3.getCurrentContent();
        //     const rawContentState = convertToRaw(contentState);
        //     const text = rawContentState.blocks.map(block => block.text).join('\n');
        //     return text;
        // }
        // setPrivacy(editorContent3())









        let content_id = 1
        let content = ''
        console.log("content selected", alignment)


        switch (alignment) {
            case 'About us':
                if (about === '') {
                    console.log("1st time cheack")
                    setMsg('Please enter about us')
                    return
                }
                content_id = 1
                content = about
                break;
            case 'Terms & condition':
                if (terms === '') {
                    setMsg('Please enter terms & condition')
                    return
                }
                content_id = 2
                content = terms
                break;
            case 'Privacy policy':
                if (privacy === '') {
                    setMsg('Please enter privacy policy')
                    return
                }
                content_id = 3
                content = privacy
                break;
            case 'Share message':
                if (message === '') {
                    setMsg('Please enter share message')
                    return
                }
                content_id = 4
                content = message
                break;
            case 'Android app url':
                if (android === '') {
                    setMsg('Please enter android app url')
                    return
                }
                content_id = 5
                content = android
                break;
            case 'IOS app url':
                if (ios === '') {
                    setMsg('Please enter ios app url')
                    return
                }
                content_id = 6
                content = ios
                break;
            default:
                console.log("Invalid option");
        }

        console.log("content data", content)


        if (content === '') {
            setShow(false)
            setMsg('Please enter content')
            return
        }

        try {
            const data = {
                // Append other form fields if needed
                action: 'update_content',
                content_id: content_id,
                content: content
            }
            // Append the image file
            axios.post(`${Url}/common_controller/update_content`, data)
                .then(obj => {
                    console.log("obj", obj.data.success)
                    if (obj.data.success) {
                        setMsg('')
                        console.log("show", show)
                        setShow(true)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        } catch (err) {

            Console("error", err);
        }


    };
    show && setTimeout(() => { setShow(false); }, 4000)



    console.log("hhh", about)
    return (
        <Box paddingY={4} paddingX={8} marginBottom={10}  >
            <Helmet>
                <title>{Language.APP_NAME} | Content</title>
            </Helmet>
            <Box display={'flex'} justifyContent={'space-between'}>
                <Box marginBottom={2} gap={1} display={'flex'}>
                    <Button sx={{ color: Constant.color[0], fontSize: 22, textTransform: 'none' }} onClick={() => navigate(`/${APP_PREFIX_PATH}/dashboard`)}  >
                        Dashboard
                    </Button>
                    <Typography marginTop={1.2} fontSize={20} >/</Typography>

                    <Typography marginTop={1.2} fontSize={20} >Manage Contents</Typography>
                </Box>
                {show &&
                    <Alert sx={{ bgcolor: '#ffffff', marginBottom: '5px' }} variant="outlined" severity="success">
                        {`${alignment} updated successfully`}
                    </Alert>
                }
            </Box>
            <Box sx={{ width: '100%', borderRadius: '15px', paddingRight: '10px' }}>
                <Grid marginTop={2} item xs={12}>
                    <ToggleButtonGroup
                        value={alignment}
                        exclusive
                        aria-label="Platform"
                        sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}

                    >
                        <ToggleButton style={{ backgroundColor: clickedButton === 'About us' ? Constant.color[0] : 'inherit', color: clickedButton === 'About us' ? 'white' : Constant.color[0], }} value="About us" onClick={(e) => { handleClick(e, 'About us') }}>About Us</ToggleButton>

                        <ToggleButton style={{ backgroundColor: clickedButton === 'Terms & condition' ? Constant.color[0] : 'inherit', color: clickedButton === 'Terms & condition' ? 'white' : Constant.color[0], }} value="Terms & condition" onClick={(e) => { handleClick(e, 'Terms & condition') }} >Terms & Condition</ToggleButton>
                        <ToggleButton style={{ backgroundColor: clickedButton === 'Privacy policy' ? Constant.color[0] : 'inherit', color: clickedButton === 'Privacy policy' ? 'white' : Constant.color[0], }} value="Privacy policy" onClick={(e) => { handleClick(e, 'Privacy policy') }}>
                            Privacy Policy
                        </ToggleButton>
                        <ToggleButton style={{ backgroundColor: clickedButton === 'Share message' ? Constant.color[0] : 'inherit', color: clickedButton === 'Share message' ? 'white' : Constant.color[0], }} value="Share message" onClick={(e) => { handleClick(e, 'Share message') }}>Share Message </ToggleButton>
                        <ToggleButton style={{ backgroundColor: clickedButton === 'Android app url' ? Constant.color[0] : 'inherit', color: clickedButton === 'Android app url' ? 'white' : Constant.color[0], }} value="Android app url" onClick={(e) => { handleClick(e, 'Android app url') }}>Android App URL</ToggleButton>
                        <ToggleButton style={{ backgroundColor: clickedButton === 'IOS app url' ? Constant.color[0] : 'inherit', color: clickedButton === 'IOS app url' ? 'white' : Constant.color[0], }} value="IOS app url" onClick={(e) => { handleClick(e, 'IOS app url') }}>IOS App URL</ToggleButton>

                    </ToggleButtonGroup>
                </Grid>

                {
                    alignment === 'About us' ?
                        <Grid bgcolor={Constant.color[1]} paddingBottom={2} marginTop={2} padding={2} item xs={12}>
                            <Typography marginBottom={4} style={{ fontFamily: 'Roboto', fontWeight: 100, color: 'gray' }} fontSize={18}><b>About Us</b></Typography>
                            <JoditEditor
                                ref={editorRef}
                                value={about || ''}
                                config={config1}
                                onChange={(htmlString) => setAbout(htmlString)}
                            />
                            <Box onClick={handleUpdate}>
                                <New name='Update' />
                            </Box>
                        </Grid> : (
                            alignment === 'Terms & condition' ?
                                <Grid bgcolor={Constant.color[1]} marginTop={2} padding={2} item xs={12}>
                                    <Typography marginBottom={4} style={{ fontFamily: 'Roboto', fontWeight: 100, color: 'gray' }} fontSize={18}><b>
                                        Term & Condition
                                    </b></Typography>
                                    <JoditEditor
                                        ref={editorRef}
                                        value={terms || ''}
                                        config={config2}
                                        onChange={(htmlString) => setTerms(htmlString)}
                                    />
                                    <Box onClick={handleUpdate}>
                                        <New name='Update' />
                                    </Box>
                                </Grid> : (
                                    alignment === 'Privacy policy' ?
                                        <Grid bgcolor={Constant.color[1]} marginTop={2} padding={2} item xs={12}>
                                            <Typography marginBottom={4} style={{ fontFamily: 'Roboto', fontWeight: 100, color: 'gray' }} fontSize={18}><b>Privacy Policy</b></Typography>
                                            <JoditEditor
                                                ref={editorRef}
                                                value={privacy || ''}
                                                config={config3}
                                                onChange={(htmlString) => setPrivacy(htmlString)}
                                            />
                                            <Box onClick={handleUpdate}>
                                                <New name='Update' />
                                            </Box>
                                        </Grid> : (
                                            alignment === 'IOS app url' ?
                                                <Grid bgcolor={Constant.color[1]} marginTop={2} padding={2} item xs={12}>
                                                    <Typography marginBottom={4} style={{ fontFamily: 'Roboto', fontWeight: 100, color: 'gray' }} fontSize={18}><b>IOS App Url
                                                    </b></Typography>
                                                    <TextField
                                                        marginBottom={4}
                                                        size='small'
                                                        label="type here..."
                                                        value={ios}
                                                        onChange={(e) => setIos(e.target.value)}
                                                        fullWidth
                                                        sx={{ width: '100%' }}
                                                    />
                                                    <Box onClick={handleUpdate}>
                                                        <New name='Update' />
                                                    </Box>
                                                </Grid> : (
                                                    alignment === 'Android app url' ?
                                                        <Grid bgcolor={Constant.color[1]} marginTop={2} padding={2} item xs={12}>
                                                            <Typography marginBottom={4} style={{ fontFamily: 'Roboto', fontWeight: 100, color: 'gray' }} fontSize={18}><b>Android App URL</b></Typography>
                                                            <TextField
                                                                marginBottom={4}
                                                                size='small'
                                                                label="type here..."
                                                                value={android}
                                                                onChange={(e) => setAndroid(e.target.value)}
                                                                fullWidth
                                                                sx={{ width: '100%' }}
                                                            />
                                                            <Box onClick={handleUpdate}>
                                                                <New name='Update' />
                                                            </Box>                                                         </Grid> : (
                                                            <Grid bgcolor={Constant.color[1]} marginTop={2} padding={2} item xs={12}>
                                                                <Typography marginBottom={4} style={{ fontFamily: 'Roboto', fontWeight: 100, color: 'gray' }} fontSize={18}><b>Share Message</b></Typography>
                                                                <TextField
                                                                    marginBottom={4}
                                                                    label="type here..."
                                                                    value={message}
                                                                    multiline
                                                                    rows={6}
                                                                    onChange={(e) => setMessage(e.target.value)}
                                                                    fullWidth
                                                                    sx={{ width: '100%' }}
                                                                />
                                                                <Box onClick={handleUpdate}>
                                                                    <New name='Update' />
                                                                </Box>
                                                            </Grid>
                                                        )
                                                )
                                        )
                                )
                        )

                }
                <Typography fontSize={14} color={'red'}>{msg}</Typography>
            </Box>
        </Box >

    )
}

export default Content
