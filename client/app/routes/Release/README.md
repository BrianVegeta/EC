Content-type : application/json
apitoken : NaDZVDOI63kW.....

{

    "uid" : "SAXXXXXX",
    "pname" : "HHH",
    "cat_id" : "00A"
}

uid
   -string
   -not null
pname
   -string
   -not null
img1
   -string
img2
   -string
img3
   -string
pdes
   -string
cat_id
   -string
   -not null
city
   -string
area
   -string
leasestart
   -long
   -not null
leaseend
   -long
   -not null
unit
   -int
   -not null
price
   -int
   -not null
currency
   -string
paymenttype
   -int   1:ATM   4:信用卡
   -not null    
transactiontype
   -int    0:面交   1:寄件
   -not null
send_option
   -string
   -desc: 可供享用人選擇的出貨方式
   -可複選
   0 : 面交
   1 :  自行寄送
   2 : 7-11
return_option
   -string
   -desc: 可供享用人選擇的還貨方式
   -可複選
   0 : 面交
   1 :  自行寄送
   2 : 7-11
return_address
   -string
   -desc:還貨地址
deposit
   -int
rules
   -string array
   使用守則
cancel_policys
   -object array
   -desc:退訂政策
      advance_day
         -int
         -not null
         -min:0
         -desc:提前退訂天數
      rate
         -int
         -not null
         -min:0
         -max:100
         -desc:扣除分享金的%數
ship_before_start_days
   -int
   -not null
   -ex: n 代表合約開始前n天出貨
min_lease_days
   -int
   -not null
   -min:0
   -max:999
   -desc:最短出租天數
tag1
   -string
   ps:3個tag不能重複
tag2
   -string
   ps:3個tag不能重複
tag3
   -string
   ps:3個tag不能重複
assign_address_type
   -int / string
   -desc: 交易方式為面交時(transactiontype = 0) , 為必填
   0 / OWNER_ASSIGN  : 分享人指定交易地點
   1 / LESSEE_ASSIGN : 享用人指定交易地點        
assign_address
   -string
   -desc:分享人指定的交易地點 , 分享人指定交易地點時(assign_address_type = 0) , 為必填
