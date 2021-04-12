class API {
	FAKE_LOADING_TIME = 300;

    uploadFile = (file) => {
    	return new Promise((res, rej) => {
    		setTimeout(() => {
    			res("Finished uploading file");
    		}, FAKE_LOADING_TIME);
    	})
    }
}

const instance = new API();

export default instance;
