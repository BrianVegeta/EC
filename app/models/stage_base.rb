class StageBase

  #CONSTANT VARIABLE
  #contractstage = [兩碼stage_type][兩碼screen_type]
  #合約前兩位代號 (類型)
  NORMAL_CONTRACT = 0   #正常合約
  SUE_CONTRACT = 1      #申訴合約
  SUE_CONTRACT_2 = 2    #申訴合約
  CANCEL_CONTRACT = 5   #取消合約
  #合約末兩位代號 (screen_type)
  STAGE_WAITING_CONFIRM = 1   #等待賣方確認
  STAGE_LAST_CHECK = 2        #雙方確認合約 (目前沒有使用到)
  STAGE_NEGOTIATING = 3       #賣方要求買方修改訂單合約
  STAGE_LESSEE_PAY = 4        #買方要付款
  STAGE_SHIPPING = 5          #賣方要出貨
  STAGE_SHIP_CONFIRM = 6      #買方確認貨品已收到
  STAGE_CONTRACT_ONGOING = 7  #等待合約開始日 (適用於租借)
  STAGE_CONTRACT_START = 8    #合約開始
  STAGE_CONTRACT_END = 9      #合約結束日已到，買方要還貨
  STAGE_RETURN_CONFIRM = 10   #賣方確認貨品是否已寄回
  STAGE_SCORE = 11            #評分階段
  STAGE_COMPLETE = 12         #合約結束
  STAGE_COMPLETE2 = 13        #合約結束

  CONTRACT_TYPE_ITEM = 'ITEM'
  CONTRACT_TYPE_SERVICE = 'SERVICE'
  CONTRACT_TYPE_SPACE = 'SPACE'
  CONTRACT_TYPE_USED_ITEM = 'USED_ITEM'
  #合約TAB代號
  TAB_REQUEST = 'TAB_REQUEST'
  TAB_PAY = 'TAB_PAY'
  TAB_SHIPPING = 'TAB_SHIPPING'
  TAB_SHIPPING_CONFIRM = 'TAB_SHIPPING_CONFIRM'
  TAB_WAITING_TO_GO = 'TAB_WAITING_TO_GO'
  TAB_ONGOING = 'TAB_ONGOING'
  TAB_RETURN = 'TAB_RETURN'
  TAB_RETURN_CONFIRM = 'TAB_RETURN_CONFIRM'
  TAB_COMPLETE = 'TAB_COMPLETE'
  TAB_CANCEL = 'TAB_CANCEL'
  TAB_SUE = 'TAB_SUE'
  TAB_SUE_COMPLETE = 'TAB_SUE_COMPLETE'
  TAB_NULL = 'TAB_NULL'

  KEY_TAB = 'tab'
  KEY_CANCEL = 'can_cancel'
  KEY_CAN_EDIT = 'can_edit'
  KEY_CAN_ACCEPT = 'can_accept'
  KEY_CAN_REJECT = 'can_reject'
  KEY_PAY = 'can_pay'
  KEY_SCORE = 'can_score'
  KEY_VIEW_SCORE = 'view_score'
  KEY_SUE = 'can_sue'

  attr_accessor :contract, :screen_type, :stage_type, :is_owner


  def initialize(contract, uid)
    #預設值
    if contract.nil?
      raise 'Exception : initializing base_stage failed b/c contract is null'
    end

    if uid.nil?
      raise 'Exception : initializing base_stage failed b/c uid is null'
    end

    #暫存合約
    self.contract = contract

    if contract['owneruid'].nil?
      raise 'Exception : initializing base_stage failed b/c owneruid is null'
    end

    #檢查是否為賣家
    self.is_owner = (contract['owneruid'].to_s.downcase == uid.to_s.downcase)

    #取得合約狀態代號
    contractstage = contract['contractstage']
    if contractstage.nil?
      raise 'Exception : initializing base_stage failed b/c contractstage is null'
    end

    #狀態代號末兩碼
    self.screen_type = contractstage % 100

    #狀態代號前兩碼
    self.stage_type = (contractstage / 1000).floor

    @display = {
      tab: TAB_NULL,              #預設TAB不存在
      can_pay: false,             #可以付款(true = show, false = hidden)
      can_score: false,           #可以評分 (true = show, false = hidden)
      view_score: false,          #可以查看評分 (true = show, false = hidden)
      can_sue: false,             #可以申訴 (true = show, false = hidden)
      can_accept: false,
      can_reject: false,
      can_edit: false,
      can_cancel: false,
      is_owner: self.is_owner,
      screen_type: self.screen_type,
    }
  end

  def display
    @display
  end

  #######################ABSTRACT FUNCTION #######################################

  def process

    case self.stage_type
    when NORMAL_CONTRACT
      check_can_accept
      check_can_edit
      check_can_canel
      prepare_normal_tab
      check_can_pay
      check_score
    when SUE_CONTRACT, SUE_CONTRACT_2
      prepare_sue_tab
      check_sue
      check_score
    when CANCEL_CONTRACT
      prepare_cancel_tab
      #NO ACTION
    end
  end

  def prepare_normal_tab
    raise 'stage base must declare prepare_normal_tab method'
  end

  protected
  #######################BASE STAGE FUNCTION #####################################
  def modify_display_param(key, value)
    @display[key] = value
  end

  def check_can_canel

  if self.is_owner == true  #賣方只能在買方付款前取消訂單
      modify_display_param(KEY_CANCEL, self.screen_type < STAGE_LESSEE_PAY)
    else
      if self.contract['type'] == CONTRACT_TYPE_ITEM
        #租借物品時，付款後就不能取消訂單
        modify_display_param(KEY_CANCEL, self.screen_type <= STAGE_LESSEE_PAY)
      elsif  self.contract['type'] == CONTRACT_TYPE_USED_ITEM
        #二手買賣時，付款後就不能取消訂單
        modify_display_param(KEY_CANCEL, self.screen_type <= STAGE_LESSEE_PAY)
      else
        #其他類型，合約開始前可以取消訂單，但會被罰違約金
        modify_display_param(KEY_CANCEL, self.screen_type < STAGE_CONTRACT_START)
      end

    end
  end

  def check_can_accept
    #接單只有賣方可以執行
    stage_check = (self.screen_type == STAGE_WAITING_CONFIRM)
    condition_check = (self.is_owner == true)
    modify_display_param(KEY_CAN_ACCEPT, stage_check && condition_check)
    modify_display_param(KEY_CAN_REJECT, stage_check && condition_check)
  end

  def check_can_edit
    #修改階段只右買方可以執行
    stage_check = (self.screen_type == STAGE_NEGOTIATING)
    condition_check = (self.is_owner == false)
    modify_display_param(KEY_CAN_EDIT, stage_check && condition_check)
  end

  def check_can_pay
    #付款階段只有買方可以執行
    stage_check = (self.screen_type == STAGE_LESSEE_PAY)
    condition_check = (self.is_owner == false)
    modify_display_param(KEY_PAY, stage_check && condition_check)
  end

  def check_sue
    modify_display_param(KEY_SUE, (self.screen_type >= STAGE_SHIPPING && self.screen_type <= STAGE_SCORE))
  end

  def check_score
    raise 'check_score not implemented'
    # if self.contract['type'] === CONTRACT_TYPE_USED_ITEM && !(self.contract['lessee_receive'].nil?)
    #   #如果是二手,只要商品收到貨就可以評分
    #   set_score_check
    # elsif self.contract['type'] === CONTRACT_TYPE_ITEM && self.screen_type == STAGE_RETURN_CONFIRM && !(self.is_owner)
    #   #如果其他租借商品還貨後，買方可以評價
    #   set_score_check
    # elsif [STAGE_SCORE, STAGE_COMPLETE, STAGE_COMPLETE2].include? self.screen_type
    #   #評分階段
    #   set_score_check
    # else
    #   #其他階段不可以評分
    #   modify_display_param(KEY_SCORE, false)
    #   modify_display_param(KEY_VIEW_SCORE, false)
    # end
    #stage_check = self.screen_type == STAGE_SCORE || self.screen_type == STAGE_RETURN_CONFIRM
    #stage_check2 = (self.contract['type'] === 'USED_ITEM' && !(self.contract['lessee_receive'].nil?))
    #if (stage_check || stage_check2)
    #  if self.is_owner
    #    modify_display_param(KEY_SCORE, (self.contract['lesseescore'].nil?))
    #    modify_display_param(KEY_VIEW_SCORE, (not self.contract['lesseescore'].nil?))
    #  else
    #    modify_display_param(KEY_SCORE, (self.contract['ownerscore'].nil?))
    #    modify_display_param(KEY_VIEW_SCORE, (not self.contract['ownerscore'].nil?))
    #  end
    #else
    #  modify_display_param(KEY_SCORE, false)
    #  modify_display_param(KEY_VIEW_SCORE, false)
    #end
  end

  def set_score_check
    if self.is_owner
      modify_display_param(KEY_SCORE, (self.contract['lesseescore'].nil?))
      modify_display_param(KEY_VIEW_SCORE, self.contract['lesseescore'].present?)
    else
      modify_display_param(KEY_SCORE, (self.contract['ownerscore'].nil?))
      modify_display_param(KEY_VIEW_SCORE, self.contract['ownerscore'].present?)
    end
  end

  def prepare_sue_tab
    if self.screen_type >= STAGE_COMPLETE
      modify_display_param(KEY_TAB, TAB_SUE_COMPLETE)
    else
      modify_display_param(KEY_TAB, TAB_SUE)
    end
  end

  def prepare_cancel_tab
    modify_display_param(KEY_TAB, TAB_CANCEL)
  end

end
