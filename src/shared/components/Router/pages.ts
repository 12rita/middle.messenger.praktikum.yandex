import {
    ChangePasswordPage,
    ChatsPage,
    Page_404,
    Page_500,
    ProfilePage,
    SignInPage,
    SignUpPage
} from '@pages';

export const Pages = {
    '/sign-in': SignInPage,
    '/sign-up': SignUpPage,
    '/settings': ProfilePage,
    '/404': Page_404,
    '/500': Page_500,
    '/messenger': ChatsPage,
    '/changePassword': ChangePasswordPage
};
