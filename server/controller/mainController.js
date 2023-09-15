const axios = require('axios');
const login = process.env.LOGIN;
const password = process.env.PASSWORD;

const postUrl = async(req, res) => {
    try {
        const {url} = req.body
        const response = await axios({
            method: 'post',
            url: 'https://api.dataforseo.com/v3/on_page/task_post',
            auth: {
                username: login,
                password: password
            },
            data: [{
                "target": url,
                "max_crawl_pages": 5,
                "load_resources": true,
                "enable_javascript": true,
                "custom_js": "meta = {}; meta.url = document.URL; meta;",
                "tag": "some_string_123",
                "pingback_url": "https://your-server.com/pingscript?id=$id&tag=$tag"
            }],
            headers: {
                'content-type': 'application/json'
            }
        })
        const result = await response.data.tasks[0];
        res.status(201).json(result)
      } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Internal Server Error'})
      }
}
const getPostData = async(req, res) => {
    try {
        const {task_id} = req.body;
        let crawlProgress = '';
        while (crawlProgress !== 'finished') {
            const response = await axios({
                method: 'post',
                url: 'https://api.dataforseo.com/v3/on_page/pages',
                auth: {
                    username: login,
                    password: password
                },
                data: [{
                    "id": task_id,
                    "order_by": ["meta.content.plain_text_word_count,desc"],
                    "limit": 5
                }],
                headers: {
                    'content-type': 'application/json'
                }
            })
    
            crawlProgress = response.data.tasks[0].result[0].crawl_progress;
        
            if (crawlProgress === 'finished') {
            res.status(200).json(response.data.tasks[0]);
            break; // Exit the loop when crawl is finished
        }
    
        // Sleep for a while before checking again (5 seconds)
        await new Promise(resolve => setTimeout(resolve, 5000));
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Internal Server Error'})
    
    }
}

module.exports = {
    postUrl,
    getPostData
}