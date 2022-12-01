
import React, { useEffect, useState } from 'react'
import { AlertDialog, Container, Field } from '@components/ui'
import { useCustomerState } from "@components/context"
import { ShippingAddressCard } from '@components/account'
import { customerDefaultAddressUpdate, getCustomerAccessToken, customerAddressDelete, customerAddressUpdate, customerAddressCreate, getCustomer } from "@shopify/customer"
import provinceToJP from '@lib/province-to-jp'
import { MailingAddress } from '@shopify/shema'

const AddressUpdate = () => {

    const { loggedCustomer, updateCustomer } = useCustomerState()
    const defaultAddress = loggedCustomer && loggedCustomer?.defaultAddress
    const addresses = loggedCustomer && loggedCustomer?.addresses.edges.map(({node: address}) => address)
    const [ showEdit, setShowEdit ] = useState(false)
    const [ editAddress, setEditAddress ] = useState<Partial<MailingAddress>>({})
    const isDefaultAddress = defaultAddress?.id === editAddress.id
    const [ isUpdateAddress, setIsUpdateAddress ] = useState(false)
    const [ isNewAddress, setIsNewAddress ] = useState(false)
    const [ errorMessage, setErrorMessage ] = useState("")
    const [ isLoading, setIsLoading] = useState(false)

    const updateCustomerAddress = async(e: any, address:  Partial<MailingAddress>) => {
      e.preventDefault()
      try{
        setIsLoading(true)
        const newAddress = {
          address: {
            address1: editAddress.address1 ?? "",
            address2: editAddress.address2 ?? "",
            city: editAddress.city ?? "",
            company: editAddress.company ?? "",
            country: "Japan",
            firstName: editAddress.firstName ?? "",
            lastName: editAddress.lastName ?? "",
            phone: editAddress.phone ?? "",
            province: editAddress.province ?? "",
            zip: editAddress.zip ?? ""
          }
        }
        await customerAddressUpdate(newAddress, getCustomerAccessToken()!, address.id!)
        let customer
        if(address.id !== defaultAddress?.id){
          console.log('not match')
          customer = await customerDefaultAddressUpdate(address.id!, getCustomerAccessToken()!)
        }else{
          customer = await getCustomer(getCustomerAccessToken()!)
        }
        updateCustomer(customer)
        closeEditView()
      }catch(e: any){
        setEditAddress(e.message)
      }finally{
        setIsLoading(false)
      }
    }

    const deleteAddress = async (address: MailingAddress) => {
      await customerAddressDelete(getCustomerAccessToken()!, address.id)
      const customer = await getCustomer(getCustomerAccessToken()!)
      updateCustomer(customer);
    }

    const closeEditView = () => {
      setShowEdit(false)
      setIsUpdateAddress(false)
    }

    const showEditView = async (address: MailingAddress) => {
      const _address = {...address, province: provinceToJP(address.province!)}
      setEditAddress(_address)
      setShowEdit(true)
    }

    const showAddressCreateView = async () => {
      setShowEdit(true)
      setIsNewAddress(true)
      setEditAddress({})
    }
    const closeAddressCreateView = async () => {
      setShowEdit(false)
      setIsNewAddress(false)
      setEditAddress({})
    }

    const createNewAddress = async (e: any) => {
      e.preventDefault()
      try{
        setIsLoading(true)
        const newAddress = {
          address: {
            address1: editAddress.address1 ?? "",
            address2: editAddress.address2 ?? "",
            city: editAddress.city ?? "",
            company: editAddress.company ?? "",
            country: "Japan",
            firstName: editAddress.firstName ?? "",
            lastName: editAddress.lastName ?? "",
            phone: editAddress.phone ?? "",
            province: editAddress.province ?? "",
            zip: editAddress.zip ?? ""
          }
        }
        await customerAddressCreate(newAddress, getCustomerAccessToken()!)
        const customer = await getCustomer(getCustomerAccessToken()!)
        updateCustomer(customer)
        closeAddressCreateView()
      }catch(e: any){
        setErrorMessage(e.message)
      }finally{
        setIsLoading(false)
      }
    }

    useEffect(() => {
},[ isDefaultAddress ])

  return (
    <Container>
      <div className='relative'>
        {
          errorMessage ? <AlertDialog title='ERROR' message={errorMessage} onClose={() => setErrorMessage("")}/>: <></>
        }
        <div className='flex items-center justify-between px-5 pt-4 pb-8 '>
          <h2 className="font-bold">配送情報を編集する</h2>
          <div className='px-3 py-1 rounded-md bg-blue-100' onClick={showAddressCreateView}>
            <p className="text-blue-500 text-sm">新規住所を作成</p>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-3 px-5 pb-12'>
          {
              addresses?.length !== 0 ? addresses?.map((_address) => <div key={_address.id} className="border shadow-sm pb-3 flex flex-col justify-between">
                                                                      <ShippingAddressCard key={_address.id} isDefault={_address.id === defaultAddress?.id} address={_address}/>
                                                                      <div className='flex items-center justify-between px-3 text-xs'>
                                                                        <div className='bg-gray-700 px-3 py-1' onClick={() => showEditView(_address)}>
                                                                          <p className='text-white'>編集する</p>
                                                                        </div>
                                                                        <div className='bg-gray-700 px-3 py-1' onClick={() => deleteAddress(_address)}>
                                                                          <p className='text-white'>削除</p>
                                                                        </div>
                                                                      </div>
                                                                    </div> )
                                      : <div className='my-28 text-gray-500 w-full text-sm'>登録住所はありません</div>
          }
        </div>
        <div className={` ${showEdit ? "fixed top-0 left-0 w-full h-full bg-black overflow-y-auto bg-opacity-50 z-20" : "hidden"}`}>
          <div className='h-fit bg-white rounded-md shadow-md mx-8 my-16 p-5'>
            <div className='flex items-center justify-between mb-4'>
              <p className="font-bold">配送情報</p>
              <div className='px-3 py-1 bg-gray-700 rounded-md' onClick={isNewAddress ? closeAddressCreateView : closeEditView} >
                <p className='text-sm text-gray-100'>閉じる</p>
              </div>
            </div>
            <form>
              <div className='space-y-3'>
                <Field id='lastName' label={"苗字"} type={"text"} autoComplete="family-name" placeHolder={"山田"} value={editAddress?.lastName ?? ""} onChange={(e) => setEditAddress({...editAddress, lastName: e.target.value})} />
                <Field id="firstName" label="名前" type='text' autoComplete='given-name' placeHolder='太郎' value={editAddress?.firstName ?? ""} onChange={(e) => setEditAddress({...editAddress, firstName: e.target.value})} />
                <Field id={"company"} label={"会社名"} type={"text"} autoComplete={"organization"} value={editAddress?.company ?? ""} placeHolder={"株式会社 〇〇建設"} onChange={(e) => setEditAddress({...editAddress, company: e.target.value})}/>
                <Field id={"phone"} label={"電話番号"} type={"tel"} autoComplete={"tel"} value={editAddress?.phone ?? ""} placeHolder={"09012345678"} onChange={(e) => setEditAddress({...editAddress, phone: e.target.value})}/>
                <Field id={"zip"} label={"郵便番号"} type={"text"} autoComplete={"postal-code"} value={editAddress?.zip ?? ""} placeHolder={"669-1233"} onChange={(e) => setEditAddress({...editAddress, zip: e.target.value})}/>
                <Field id={"province"} label={"都道府県"} type={"text"} autoComplete={"address-level1"} value={editAddress?.province ?? ""} placeHolder={"大阪府"} onChange={(e) => setEditAddress({...editAddress, province: e.target.value})}/>
                <Field id={"city"} label={"市町村"} type={"text"} autoComplete={"address-level2"} value={editAddress?.city ?? ""} placeHolder={"大阪市"} onChange={(e) => setEditAddress({...editAddress, city: e.target.value})}/>
                <Field id={"address1"} label={"番地"} type={"text"} autoComplete={"street-address"} value={editAddress?.address1 ?? ""} placeHolder={"59-45"} onChange={(e) => setEditAddress({...editAddress, address1: e.target.value})}/>
                <Field id={"address2"} label={"詳細住所"} type={"text"} value={editAddress?.address2 ?? ""} placeHolder={"ハイツ山田 2階 206号室"} onChange={(e) => setEditAddress({...editAddress, address2: e.target.value})}/>
                <div className="flex items-center justify-center pt-2">
                  <input id='defaultAddress' type="checkbox" checked={isDefaultAddress ? isDefaultAddress :isUpdateAddress} onChange={() => setIsUpdateAddress(!isUpdateAddress)} />
                  <label className="ml-3 text-sm" htmlFor="defaultAddress">デフォルトの配送情報にする</label>
                </div>
                <div className='w-fit mx-auto pb-1 pt-4'>
                  <button className='px-6 py-2 bg-green-100 rounded-md shadow-sm' onClick={isNewAddress ? (e) => {createNewAddress(e)} : (e) => updateCustomerAddress(e,editAddress)} disabled={isLoading}>
                    <p className='text-green-500'>{ isNewAddress ? "住所を作成": "住所を変更" }</p>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default AddressUpdate
