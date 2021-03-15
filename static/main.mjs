import { post } from './http.mjs';
import { powerboxRequest } from './rpc.mjs';
import { pbDescriptor } from './pb-descriptor.mjs';

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('request-btn').addEventListener('click', () => {
    console.log('Jim1 click')
    powerboxRequest({
      query: pbDescriptor,
      saveLabel: {defaultText: "Your GitHub account, for fetching your public key."},
    }).then((response) => {
      console.log('Jim2 response', response)
      return post('/powerbox-token', response.token)
    }).then(() => {
      window.location.href = '/posts';
    }).catch(err => {
      console.error('Jim3 error', err)
    })
  })
})
