
import React, { useEffect, useState } from 'react'
import { AlertDialog, Container, Field } from '@components/ui'
import { useCustomerState } from "@components/context"
import { ShippingAddressCard } from '@components/my-page'
import { checkoutShippingAddressUpdate } from "@shopify/cart"
import { customerDefaultAddressUpdate, getCustomerAccessToken, customerAddressDelete, customerAddressUpdate, customerAddressCreate, getCustomer } from "@shopify/customer"
import { provinceToJP } from '@lib/province-to-jp'
import { MailingAddress } from '@shopify/shema'
import { getCheckoutId, getCheckout } from '@shopify/cart'

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
        await customerAddressUpdate(newAddress, getCustomerAccessToken()!, address.id!)
        let customer
        if(address.id !== defaultAddress?.id){
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
      
      await checkoutShippingAddressUpdate(getCheckoutId()!)
      await customerAddressDelete(getCustomerAccessToken()!, address.id)
      const customer = await getCustomer(getCustomerAccessToken()!)
      updateCustomer(customer);
    }

    const closeEditView = () => {
      setEditAddress({})
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
    }

    const closeAddressCreateView = async () => {
      setEditAddress({})
      setShowEdit(false)
      setIsNewAddress(false)
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
            province: provinceToJP(editAddress.province!) ?? "",
            zip: editAddress.zip ?? ""
          }
        }
        // ??????????????????????????????????????????
        if(isUpdateAddress){
          const _address = await customerAddressCreate(newAddress, getCustomerAccessToken()!)
          if(_address.id !== defaultAddress?.id){
            const customer = await customerDefaultAddressUpdate(_address.id!, getCustomerAccessToken()!)
            updateCustomer(customer)
          }
        }else{
          await customerAddressCreate(newAddress, getCustomerAccessToken()!)
          const customer = await getCustomer(getCustomerAccessToken()!)
          updateCustomer(customer)
        }
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
      <div className='relative px-8 pt-6 pb-4'>
        {
          errorMessage ? <AlertDialog title='ERROR' message={errorMessage} onClose={() => setErrorMessage("")}/>: <></>
        }
        <div className='flex items-center justify-between'>
          <h2 className="font-bold text-lg">?????????????????????</h2>
          <div className='px-3 py-1 rounded-md bg-blue-500 shadow-md' onClick={showAddressCreateView}>
            <p className="text-white text-sm">?????????????????????</p>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-3 pt-8 pb-12'>
          {
              addresses?.length !== 0 ? addresses?.map((_address) => <div key={_address.id} className="border shadow-sm rounded-md pb-3 flex flex-col justify-between">
                                                                      <ShippingAddressCard key={_address.id} isDefault={_address.id === defaultAddress?.id} address={_address}/>
                                                                      <div className='flex items-center justify-between px-3 text-xs'>
                                                                        <div className='bg-gray-700 rounded-md px-3 py-1' onClick={() => showEditView(_address)}>
                                                                          <p className='text-white'>????????????</p>
                                                                        </div>
                                                                        <div className='bg-red-500 rounded-md px-3 py-1' onClick={() => deleteAddress(_address)}>
                                                                          <p className='text-white'>??????</p>
                                                                        </div>
                                                                      </div>
                                                                    </div> )
                                      : <div className='my-28 text-gray-500 w-full text-sm'>??????????????????????????????</div>
          }
        </div>
        <div className={` ${showEdit ? "fixed top-0 left-0 w-full h-full bg-black overflow-y-auto bg-opacity-50 z-20" : "hidden"}`}>
          <div className='h-fit bg-white rounded-md shadow-md mx-8 mb-16 mt-28 p-5'>
            <div className='flex items-center justify-between mb-4'>
              <p className="font-bold">????????????</p>
              <div className='px-3 py-1 bg-gray-700 rounded-md' onClick={isNewAddress ? closeAddressCreateView : closeEditView} >
                <p className='text-sm text-gray-100'>?????????</p>
              </div>
            </div>
            <form>
              <div className='space-y-3'>
                <Field id='lastName' label={"??????"} type={"text"} autoComplete="family-name" placeHolder={"??????"} value={editAddress?.lastName ?? ""} onChange={(e) => setEditAddress({...editAddress, lastName: e.target.value})} />
                <Field id="firstName" label="??????" type='text' autoComplete='given-name' placeHolder='??????' value={editAddress?.firstName ?? ""} onChange={(e) => setEditAddress({...editAddress, firstName: e.target.value})} />
                <Field id={"company"} label={"?????????"} type={"text"} autoComplete={"organization"} value={editAddress?.company ?? ""} placeHolder={"???????????? ????????????"} onChange={(e) => setEditAddress({...editAddress, company: e.target.value})}/>
                <Field id={"phone"} label={"????????????"} type={"tel"} autoComplete={"tel"} value={editAddress?.phone ?? ""} placeHolder={"09012345678"} onChange={(e) => setEditAddress({...editAddress, phone: e.target.value})}/>
                <Field id={"zip"} label={"????????????"} type={"text"} autoComplete={"postal-code"} value={editAddress?.zip ?? ""} placeHolder={"669-1233"} onChange={(e) => setEditAddress({...editAddress, zip: e.target.value})}/>
                <Field id={"province"} label={"????????????"} type={"text"} autoComplete={"address-level1"} value={editAddress?.province ?? ""} placeHolder={"?????????"} onChange={(e) => setEditAddress({...editAddress, province: e.target.value})}/>
                <Field id={"city"} label={"?????????"} type={"text"} autoComplete={"address-level2"} value={editAddress?.city ?? ""} placeHolder={"?????????"} onChange={(e) => setEditAddress({...editAddress, city: e.target.value})}/>
                <Field id={"address1"} label={"??????"} type={"text"} autoComplete={"street-address"} value={editAddress?.address1 ?? ""} placeHolder={"59-45"} onChange={(e) => setEditAddress({...editAddress, address1: e.target.value})}/>
                <Field id={"address2"} label={"????????????"} type={"text"} value={editAddress?.address2 ?? ""} placeHolder={"??????????????? 2??? 206??????"} onChange={(e) => setEditAddress({...editAddress, address2: e.target.value})}/>
                <div className="flex items-center justify-center pt-2">
                  <input id='defaultAddress' type="checkbox" checked={isDefaultAddress ? isDefaultAddress :isUpdateAddress} onChange={() => setIsUpdateAddress(!isUpdateAddress)} />
                  <label className="ml-3 text-sm" htmlFor="defaultAddress">???????????????????????????????????????</label>
                </div>
                <div className='w-fit mx-auto pb-1 pt-4'>
                  <button className='px-6 py-2 bg-green-100 rounded-md shadow-sm' onClick={isNewAddress ? (e) => {createNewAddress(e)} : (e) => updateCustomerAddress(e,editAddress)} disabled={isLoading}>
                    <p className='text-green-500'>{ isNewAddress ? "???????????????": "???????????????" }</p>
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
