import { ToastProgrammatic as Toast } from 'buefy'
export default function ({ $axios }) {
  $axios.onError(error => {
      Toast.open({
        duration: 5000,
        message: `${error.response.data.message} <br> <small>Code: ${error.response.status}</small>`,
        position: 'is-bottom',
        type: 'is-danger'
      })
  })

  $axios.showSuccess = function (msg){
    Toast.open({
      duration: 5000,
      message: msg,
      position: 'is-bottom',
      type: 'is-success'
    })
  }

  $axios.showDanger = function (msg){
    Toast.open({
      duration: 5000,
      message: msg,
      position: 'is-bottom',
      type: 'is-danger'
    })
  }
}
