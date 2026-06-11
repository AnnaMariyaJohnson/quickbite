import api from './axios';
import { Notification } from '../types/notification';

export const notificationApi={
    getNotifications:async(
        userId:string,
    ):Promise<Notification[]>=>{
        const response= await api.get(`/Notifications/user/${userId}`);
        return response.data;
    },

    markAsRead:async(notificationId:string)=>{
        const response=await api.put(`/Notifications/${notificationId}/read`);
        return response.data;
    },

    getUnreadCount:async(
        userId:string,
    ):Promise<number>=>{
        const response= await api.get(`/Notifications/user/${userId}/unread-count`);
        return response.data;
    }
};