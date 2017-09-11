class UsedItemStage < StageBase

  #CONSTANT VALUE
  KEY_SHIP = 'can_ship'
  KEY_SHIP_CONFIRM = 'can_ship_confirm'


  def initialize(contract, uid)
    super(contract, uid)
    modify_display_param(KEY_CANCEL, false)          #可以取消訂單 (true = show, false = hidden)
    modify_display_param(KEY_SHIP, false)            #可以出貨 (true = show, false = hidden)
    modify_display_param(KEY_SHIP_CONFIRM, false)    #可以確認取貨 (true = show, false = hidden)
  end

  ####################### ABSTRACT FUNCTION #######################################
  def process
    super

    #ADDITIONAL PROCESS
    if self.stage_type == NORMAL_CONTRACT
      check_can_ship
      check_can_ship_confirm
    end

  end

  def prepare_normal_tab
    case self.screen_type
    when STAGE_WAITING_CONFIRM, STAGE_LAST_CHECK, STAGE_NEGOTIATING, STAGE_LESSEE_PAY
      modify_display_param(KEY_TAB, TAB_PAY)
    when STAGE_SHIPPING
      modify_display_param(KEY_TAB, TAB_SHIPPING)
    when STAGE_SHIP_CONFIRM, STAGE_CONTRACT_ONGOING, STAGE_CONTRACT_START,
      check_can_ship_confirm_stage
    when STAGE_SCORE, STAGE_COMPLETE, STAGE_COMPLETE2
      modify_display_param(KEY_TAB, TAB_COMPLETE)
    else
      raise self.screen_type.inspect
      raise 'Exception : screen_type error'
    end
  end

  protected
   ####################### BASE STAGE FUNCTION #####################################
  def check_can_ship
    check_stage = self.screen_type == STAGE_SHIPPING
    check_condition = (self.is_owner == true)
    modify_display_param(KEY_SHIP, check_stage && check_condition)
  end

  def check_can_ship_confirm_stage
    if (not self.contract['lessee_receive'])
      modify_display_param(KEY_TAB, TAB_SHIPPING_CONFIRM)
      modify_display_param(KEY_SCORE, false)
      modify_display_param(KEY_VIEW_SCORE, false)
    else
      # raise self.screen_type.inspect
      modify_display_param(KEY_TAB, TAB_COMPLETE)
      if self.is_owner
        modify_display_param(KEY_SCORE, (self.contract['lesseescore'].nil?))
        modify_display_param(KEY_VIEW_SCORE, (not self.contract['lesseescore'].nil?))
      else
        modify_display_param(KEY_SCORE, (self.contract['ownerscore'].nil?))
        modify_display_param(KEY_VIEW_SCORE, (not self.contract['ownerscore'].nil?))
      end
    end
  end

  def check_can_ship_confirm
    check_stage = self.screen_type == STAGE_SHIP_CONFIRM
    check_condition = (self.is_owner == false) && (not self.contract['lessee_receive'])
    modify_display_param(KEY_SHIP_CONFIRM, check_stage && check_condition)
  end

end
