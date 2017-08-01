class StageBase

  #CONSTANT VARIABLE
  #合約末兩位代號
  WAITING_CONFIRM = 1
  LAST_CHECK = 2
  NEGOTIATING = 3
  LESSE_PAY = 4
  SHIPPING = 5
  SHIP_CONFIRM = 6
  CONTRACT_ONGOING = 7
  CONTRACT_START = 8
  CONTRACT_END = 9
  RETURN_CONFIRM = 10
  SCORE = 11
  COMPLETE = 12
  COMPLETE2 = 13
  
  #合約stage代號
  NORMAL_START_STAGE = 0
  NORMAL_END_STAGE = 1
  SUE_START_STAGE = 20
  SUE_END_STAGE = 40
  CANCEL_START_STAGE = 50
  CANCEL_END_STAGE = 60

  #合約TAB代號
  TAB_REQUEST = 'TAB_REQUEST'
  TAB_PAY = 'TAB_PAY'
  TAB_SHIPPING = 'TAB_SHIPPING'
#  TAB_SHIPPING_CONFIRM = 'TAB_SHIPPING_CONFIRM'
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
  KEY_SHOW_DETAIL = 'show_detail'
  KEY_PAY = 'can_pay'
  KEY_SCORE = 'can_score'
  KEY_SHOW_SCORE = 'show_score'
  KEY_SUE = 'can_sue'
  
  NORMAL_CONTRACT = 0
  SUE_CONTRACT = 1
  CANCEL_CONTRACT = 2
  
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
    self.is_owner = (contract['owneruid'].to_s.downcase == uid.to_s.downcase) #檢查是否為賣家
    contractstage = contract['contractstage']                                 #取得合約狀態代號
    self.screen_type = contractstage % 100                                    #狀態代號末兩碼
    stage_code = (contractstage - self.screen_type) / 100                     #狀態代號前兩碼
    
    if (stage_code >= NORMAL_START_STAGE && stage_code < NORMAL_END_STAGE)
      self.stage_type = NORMAL_CONTRACT
    else if (stage_code >= SUE_START_STAGE && stage_code < SUE_END_STAGE)
      self.stage_type = SUE_CONTRACT
    else if (stage_code >= CANCEL_START_STAGE && stage_code < CANCEL_END_STAGE)
      self.stage_type = CANCEL_CONTRACT
    else 
      raise "Exception : #{contractstage.inspect} invalid contract stage code!!!!"
    end
    
    @display = {
      tab: TAB_NULL,              #預設TAB不存在
      show_detail: false,         #查看按鈕 (true = show, false = hidden)
      can_pay: false,             #可以付款(true = show, false = hidden)
      can_score: false,           #可以評分 (true = show, false = hidden)
      can_sue: false,             #可以申訴 (true = show, false = hidden)
      show_score: false,          #可以查看評分 (true = show, false = hidden)
      } 
  end  
  
  def display
    @display
  end

  ####################### ABSTRACT FUNCTION #######################################

  def process

    case self.stage_type
    when NORMAL_CONTRACT
      prepare_normal_tab
      check_show_detail
      check_can_pay
      check_score
    when SUE_CONTRACT
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
    modify_display_param(KEY_SHOW_DETAIL, self.screen_type == WAITING_CONFIRM)
  end
  
  def check_can_pay 
    modify_display_param(KEY_PAY, self.screen_type == LESSE_PAY)
  end
  
  def check_sue
    modify_display_param(KEY_SUE, (self.screen_type >= SHIPPING && self.screen_type <= SCORE))
  end
  
  def check_score
  
    if not (self.screen_type >= SCORE)
      return
    end
  
    modify_display_param(KEY_OWNER_END, (self.contract['ownerscore'].nil?))
    modify_display_param(KEY_OWNER_VISIT_SCORE, (not self.contract['ownerscore'].nil?))
    
    modify_display_param(KEY_LESSEE_END, (self.contract['lesseescore'].nil?))
    modify_display_param(KEY_LESSEE_VISIT_SCORE, (not self.contract['lesseescore'].nil?))
    
  end
  
  def prepare_sue_tab
    if self.screen_type >= COMPLETE
      modify_display_param(KEY_TAB, TAB_SUE_COMPLETE)
    else 
      modify_display_param(KEY_TAB, TAB_SUE)
    end
  end
  
  def prepare_cancel_tab
    modify_display_param(KEY_TAB, TAB_CANCEL)
  end
  
end
