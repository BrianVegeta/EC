class ItemStage < StageBase
 
  #CONSTANT VALUE
  KEY_SHIP = 'can_ship'
  KEY_RETURN = 'can_return'
  KEY_RETURN_CONFIRM = 'can_return_confirm'
  KEY_CAMERA = 'can_camera'
  
  
  def initialize(contract, uid)
    super(contract, uid)
    modify_display_param(KEY_SHIP, false)            #可以出貨 (true = show, false = hidden)
    modify_display_param(KEY_RETURN, false)          #可以還貨 (true = show, false = hidden)
    modify_display_param(KEY_RETURN_CONFIRM, false)  #可以確認還貨 (true = show, false = hidden)
    modify_display_param(KEY_CAMERA, false)          #可以拍照 (true = show, false = hidden)
  end  

  ####################### ABSTRACT FUNCTION #######################################
  def process
    super
    
    #ADDITIONAL PROCESS
    if self.stage_type == NORMAL_CONTRACT
      check_can_ship
      check_return_ship
      check_return_confirm_ship
      check_camera
    end

  end
 
  def prepare_normal_tab
    case self.stage_type
    when WAITING_CONFIRM, LAST_CHECK, NEGOTIATING
      modify_display_param(KEY_TAB, TAB_REQUEST)
    when LESSE_PAY
      modify_display_param(KEY_TAB, TAB_PAY)
    when SHIPPING, SHIP_CONFIRM
      modify_display_param(KEY_TAB, TAB_SHIPPING)
    when
      modify_display_param(KEY_TAB, TAB_PAY)
      
    end 
    
  end
   
  protected
   ####################### BASE STAGE FUNCTION #####################################
  def check_can_ship  
    modify_display_param(KEY_SHIP, self.screen_type == SHIPPING)
  end
  
  def check_return_ship
    modify_display_param(KEY_RETURN, self.screen_type == CONTRACT_END)
  end
  
  def check_return_confirm_ship
    modify_display_param(KEY_RETURN_CONFIRM, self.screen_type == RETURN_CONFIRM)
  end
  CONTRACT_ONGOING = 7
  CONTRACT_START = 8
  CONTRACT_END = 9
  RETURN_CONFIRM = 10
  
  def check_camera
    check = self.screen_type == SHIPPING || self.screen_type == SHIP_CONFIRM || self.screen_type == CONTRACT_END || self.screen_type == RETURN_CONFIRM
    modify_display_param(KEY_CAMERA, check)
  end

end
