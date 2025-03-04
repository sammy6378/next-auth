
// apply next-auth to the whole application-means protected
export {default} from 'next-auth/middleware'


// or apply it to specific routes
export const config = {matcher: ['/user/dashboard']}