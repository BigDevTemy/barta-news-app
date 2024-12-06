
  import { message } from 'antd';
import axios from '../util/Api'
  

  export const fetchRecords = (url) => {
    let token = localStorage.getItem("token") && JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common['Accept'] = "application/json";
    axios.defaults.headers.common['Authorization'] = "Bearer " + token;
    //axios.defaults.headers.common['X-Additional-Auth-Token'] = document.cookie.replace(/(?:(?:^|.*;\s*)additional_auth_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  
    return new Promise((resolve, reject) => {
      axios.get(url).then(({data}) => {
        resolve(data);
      }).catch(err => {
        reject(err);
      });
    });
  };
  
  export const saveRecords = (url, data) => {
    let token = localStorage.getItem("token") && JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common['Accept'] = " application/json";
    axios.defaults.headers.common['Authorization'] = "Bearer " + token;
    //axios.defaults.headers.common['X-Additional-Auth-Token'] = document.cookie.replace(/(?:(?:^|.*;\s*)additional_auth_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  
    return new Promise((resolve, reject) => {
      axios.post(url, data).then(({data}) => {
  
        resolve(data);
  
      }).catch(err => {
        reject(err);
        console.log('internal',err);
        
      });
    });
  
  
  };
  
  export const saveRecordsDownloader = (url, data) => {
    let token = JSON.parse(localStorage.getItem("token"));
    
    axios.defaults.headers.common['Authorization'] = "Bearer " + token;
  
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: url,
            data: data,
            responseType: 'blob', // This is important for downloading blobs (binary data)
        })
        .then(response => {
            // Create a URL from the blob and trigger the download
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const url = window.URL.createObjectURL(blob);
  
            // Create an <a> element to programmatically trigger the download
            const link = document.createElement('a');
            link.href = url;
  
            // Set the filename dynamically if the backend returns one
            const filename = response.headers['content-disposition']
                ? response.headers['content-disposition'].split('filename=')[1].replace(/"/g, '')
                : 'downloaded_file.pdf'; // Fallback filename
  
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
  
            // Clean up by removing the element and revoking the URL
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
  
            // Resolve the promise to indicate success
            resolve(response.data);
        })
        .catch(err => {
            reject(err);
            console.log(err);
        });
    });
  };
  
  
  
  
  
  
  
  
  