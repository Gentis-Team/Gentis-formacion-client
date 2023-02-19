import { toast } from 'react-toastify';

export default function useHandleError(error) {
    if (Array.isArray((error).data.error)) {
        (error).data.error.forEach((el) =>
            toast.error(el.message, {
                position: 'top-right',
            })
        );
    } else {
        toast.error((error).data.message, {
            position: 'top-right',
        });
    }
}