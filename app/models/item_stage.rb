class ItemStage < StageBase

  #CONSTANT VALUE
  KEY_SHIP = 'can_ship'
  KEY_711 = 'can_711'
  KEY_711_RETURN = 'can_711_return'
  KEY_SHIP_CONFIRM = 'can_ship_confirm'
  KEY_RETURN = 'can_return'
  KEY_RETURN_CONFIRM = 'can_return_confirm'
  KEY_CAMERA = 'can_camera'

  def initialize(contract, uid)
    super(contract, uid)
    modify_display_param(KEY_SHIP, false)            #可以出貨 (true = show, false = hidden)
    modify_display_param(KEY_SHIP_CONFIRM, false)    #可以確認取貨 (true = show, false = hidden)
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
      check_can_ship_confirm
      check_return_ship
      check_return_confirm
    end

  end

  def prepare_normal_tab
    case self.screen_type
    when STAGE_WAITING_CONFIRM, STAGE_LAST_CHECK, STAGE_NEGOTIATING
      modify_display_param(KEY_TAB, TAB_REQUEST)
    when STAGE_LESSEE_PAY
      modify_display_param(KEY_TAB, TAB_PAY)
    when STAGE_SHIPPING
      self.is_owner ? modify_display_param(KEY_TAB, TAB_SHIPPING) : modify_display_param(KEY_TAB, TAB_SHIPPING_CONFIRM)
    when STAGE_SHIP_CONFIRM, STAGE_CONTRACT_ONGOING
      modify_display_param(KEY_TAB, TAB_SHIPPING_CONFIRM)
    when STAGE_CONTRACT_START, STAGE_CONTRACT_END, STAGE_RETURN_CONFIRM
      self.is_owner ? modify_display_param(KEY_TAB, TAB_SHIPPING_CONFIRM) : modify_display_param(KEY_TAB, TAB_RETURN)
    when STAGE_SCORE, STAGE_COMPLETE, STAGE_COMPLETE2
      modify_display_param(KEY_TAB, TAB_COMPLETE)
    else
      raise 'Exception : screen_type error'
    end
  end

  protected
   ####################### BASE STAGE FUNCTION #####################################
  def check_can_ship
    check_stage = self.screen_type == STAGE_SHIPPING
    check_condition = (self.is_owner == true)
    if self.contract['send_type'] == '2'
      modify_display_param(KEY_711, check_stage && check_condition)
    else
      modify_display_param(KEY_SHIP, check_stage && check_condition)
    end
    modify_display_param(KEY_CAMERA, display[KEY_CAMERA] || (check_stage && check_condition))
  end

  def check_can_ship_confirm
    check_stage = self.screen_type == STAGE_SHIP_CONFIRM || self.screen_type == STAGE_CONTRACT_ONGOING
    check_condition = (self.is_owner == false) && (not self.contract['lessee_receive'])
    modify_display_param(KEY_SHIP_CONFIRM, check_stage && check_condition)
    modify_display_param(KEY_CAMERA, display[KEY_CAMERA] || (check_stage && check_condition))
  end

  def check_return_ship
    check_stage = self.screen_type == STAGE_CONTRACT_END
    check_condition = (self.is_owner == false)
    if self.contract['send_type'] == '2'
      modify_display_param(KEY_711_RETURN, check_stage && check_condition)
    else
      modify_display_param(KEY_RETURN, check_stage && check_condition)
    end
    modify_display_param(KEY_CAMERA, display[KEY_CAMERA] || (check_stage && check_condition))
  end

  def check_return_confirm
    check_stage = self.screen_type == STAGE_RETURN_CONFIRM
    check_condition = (self.is_owner == true) && (not self.contract['owner_receive'])
    modify_display_param(KEY_RETURN_CONFIRM, check_stage && check_condition)
    modify_display_param(KEY_CAMERA, display[KEY_CAMERA] || (check_stage && check_condition))
  end

  def check_score
    if self.is_owner
      if self.screen_type >= STAGE_SCORE
        set_score_check
      end
    else
      if self.screen_type >= STAGE_RETURN_CONFIRM
        set_score_check
      end
    end
  end

end
