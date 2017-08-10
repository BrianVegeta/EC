class StageBase

  #CONSTANT VARIABLE
  #合約末兩位代號
  STAGE_WAITING_CONFIRM = 1
  STAGE_LAST_CHECK = 2
  STAGE_NEGOTIATING = 3
  STAGE_LESSEE_PAY = 4
  STAGE_SHIPPING = 5
  STAGE_SHIP_CONFIRM = 6
  STAGE_CONTRACT_ONGOING = 7
  STAGE_CONTRACT_START = 8
  STAGE_CONTRACT_END = 9
  STAGE_RETURN_CONFIRM = 10
  STAGE_SCORE = 11
  STAGE_COMPLETE = 12
  STAGE_COMPLETE2 = 13

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
  KEY_CANCEL = 'can_canel'
  KEY_CAN_EDIT = 'can_edit'
  KEY_CAN_ACCEPT = 'can_accept'
  KEY_CAN_REJECT = 'can_reject'
  KEY_SHOW_DETAIL = 'show_detail'
  KEY_PAY = 'can_pay'
  KEY_SCORE = 'can_score'
  KEY_SUE = 'can_sue'
  KEY_OWNER_SCORE = 'can_owner_score'
  KEY_OWNER_VISIT_SCORE = 'can_owner_visit_score'
  KEY_LESSEE_SCORE = 'can_lessee_score'
  KEY_LESSEE_VISIT_SCORE = 'can_lessee_visit_score'



  NORMAL_CONTRACT = 0
  SUE_CONTRACT = 1
  SUE_CONTRACT_2 = 2
  CANCEL_CONTRACT = 5

  attr_accessor :contract, :screen_type, :stage_type, :is_owner


  def initialize(contract, uid)
    #預設值
    if contract.nil?
      raise 'Exception : initializing base_stage failed b/c contract is null'
    end

    if uid.nil?
      raise 'Exception : initializing base_stage failed b/c uid is null'
    end

    self.contract = contract                                                  #暫存合約

    if contract['owneruid'].nil?
      raise 'Exception : initializing base_stage failed b/c owneruid is null'
    end

    self.is_owner = (contract['owneruid'].to_s.downcase == uid.to_s.downcase)           #檢查是否為賣家

    contractstage = contract['contractstage']                                 #取得合約狀態代號
    if contractstage.nil?
      raise 'Exception : initializing base_stage failed b/c contractstage is null'
    end

    self.screen_type = contractstage % 100                                    #狀態代號末兩碼


    self.stage_type = (contractstage / 1000).floor                            #狀態代號前兩碼

    @display = {
      tab: TAB_NULL,              #預設TAB不存在
      show_detail: false,         #查看按鈕 (true = show, false = hidden)
      can_pay: false,             #可以付款(true = show, false = hidden)
      can_score: false,           #可以評分 (true = show, false = hidden)
      can_sue: false,             #可以申訴 (true = show, false = hidden)
      can_owner_score: false,
      can_owner_visit_score: false,
      can_lessee_score: false,
      can_lesse_visit_score: false,
      can_accept: false,
      can_reject: false,
      can_edit: false,
      can_cancel: false,
      is_owner: self.is_owner,
      }
  end

  def display
    @display
  end

  ####################### ABSTRACT FUNCTION #######################################

  def process

    case self.stage_type
    when NORMAL_CONTRACT
      check_can_accept
      check_can_edit
      check_can_canel
      prepare_normal_tab
      check_show_detail
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
  ####################### BASE STAGE FUNCTION #####################################
  def modify_display_param(key, value)
    @display[key] = value
  end

  def check_show_detail
    modify_display_param(KEY_SHOW_DETAIL, self.screen_type == STAGE_WAITING_CONFIRM)
  end

  def check_can_canel
    if self.is_owner == true
      modify_display_param(KEY_CANCEL, self.screen_type <= STAGE_LESSEE_PAY)
    else
      modify_display_param(KEY_CANCEL, self.screen_type < STAGE_CONTRACT_START)
    end
  end

  def check_can_accept
    stage_check = (self.screen_type == STAGE_LAST_CHECK)
    condition_check = (self.is_owner == true)
    modify_display_param(KEY_CAN_ACCEPT, stage_check && condition_check);
    modify_display_param(KEY_CAN_REJECT, stage_check && condition_check);
  end

  def check_can_edit
    modify_display_param(KEY_CAN_EDIT, self.screen_type == STAGE_NEGOTIATING)
  end

  def check_can_pay
    modify_display_param(KEY_PAY, self.screen_type == STAGE_LESSEE_PAY)
  end

  def check_sue
    modify_display_param(KEY_SUE, (self.screen_type >= STAGE_SHIPPING && self.screen_type <= STAGE_SCORE))
  end

  def check_score

    if not (self.screen_type >= STAGE_SCORE)
      return
    end

    if self.is_owner
      modify_display_param(KEY_OWNER_SCORE, (self.contract['ownerscore'].nil?))
      modify_display_param(KEY_OWNER_VISIT_SCORE, (not self.contract['ownerscore'].nil?))
    else
      modify_display_param(KEY_LESSEE_SCORE, (self.contract['lesseescore'].nil?))
      modify_display_param(KEY_LESSEE_VISIT_SCORE, (not self.contract['lesseescore'].nil?))
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
