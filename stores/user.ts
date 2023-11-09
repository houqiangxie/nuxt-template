/*
 * @Descripttion: 
 * @version: 
 * @Author: houqiangxie
 * @Date: 2023-11-08 11:10:30
 * @LastEditors: houqiangxie
 * @LastEditTime: 2023-11-08 18:52:32
 */
export const useUser = () => {
    const userInfo =useState('userInfo', () => ({ token:''}))
    console.log('userInfo: ', userInfo);
    return { userInfo }
}