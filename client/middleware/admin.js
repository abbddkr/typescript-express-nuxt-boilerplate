import { ToastProgrammatic as Toast } from 'buefy'

/**
 * redirect any user has user role permission
 * @param {*} param0
 * @returns
 */
export default function ({ $auth, redirect }) {
     if ($auth.user.role === 'user') {
        Toast.open({
            duration: 5000,
            message: `You are not authorized!`,
            position: 'is-bottom',
            type: 'is-danger'
          })
         return redirect('/')
     }
}
