import { ChangeEvent, useState } from 'react'
import { supabase } from '@/app/supabaseClient';
import { useAppDispatch } from './useRedux';
import { setUserAvatar, setUserCover } from '@/app/store/slices/userSlice';

const useChangeImage = () => {
    const [uploading, setUploading] = useState(false);
    const dispatch = useAppDispatch();

    const changeImage = async (
        e: ChangeEvent<HTMLInputElement>, 
        path: 'avatars' | 'covers', 
        username: string,
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;
    
        setUploading(true);
        try {
            const fileNameEnd = (Math.random() * 10000).toFixed(3);
            const fileName = `${path}/${username}_${Date.now()}_${fileNameEnd}`;
        
            const { error: uploadError } = await supabase.storage
                .from('user')
                .upload(fileName, file);
        
            if (uploadError) throw uploadError;
        
            const { data: { publicUrl } } = supabase.storage
                .from('user')
                .getPublicUrl(fileName);
        
            if (path === 'covers') {
                dispatch(setUserCover(publicUrl))
            }
            if (path === 'avatars') {
                dispatch(setUserAvatar(publicUrl))
            }
    
        } catch (error) {
            console.error("Error uploading image:", error instanceof Error ? error.message : error);
        } finally {
            setUploading(false);
        }
    }

    return {changeImage, uploading}
}

export default useChangeImage